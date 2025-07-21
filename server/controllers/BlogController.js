import Blog from '../models/BlogModel.js';
import User from '../models/UserModel.js';
import transporter from '../config/nodemailer.js';
import { BLOG_NOTIFICATION_TEMPLATE, sendEmail } from '../config/emailTemplets.js';

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, category, image } = req.body;

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      category,
      image
    });

    await newBlog.save();
    
    // Send email notifications to all users after blog is successfully created
    try {
      console.log('📧 Starting to send blog notification emails to all users...');
      
      // Get all users with verified accounts
      const users = await User.find({ isAccountVerified: true }, 'name email');
      console.log(`📧 Found ${users.length} verified users to notify`);
      
      if (users.length > 0) {
        // Create blog URL - assuming the frontend blog URL pattern
        const blogUrl = `${process.env.FRONTEND_URL || 'https://99digicom.com'}/blogs/${newBlog._id}`;
        
        // Format publish date
        const publishDate = new Date(newBlog.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        // Estimate read time based on content length (average 200 words per minute)
        const wordCount = newBlog.content.split(' ').length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        
        // Prepare email content
        const emailContent = BLOG_NOTIFICATION_TEMPLATE
          .replace(/{{blogTitle}}/g, newBlog.title)
          .replace(/{{blogExcerpt}}/g, newBlog.excerpt)
          .replace(/{{blogCategory}}/g, newBlog.category)
          .replace(/{{blogImage}}/g, newBlog.image)
          .replace(/{{blogUrl}}/g, blogUrl)
          .replace(/{{publishDate}}/g, publishDate)
          .replace(/{{readTime}}/g, readTime.toString());
        
        // Send emails to all users (batch processing for better performance)
        const emailPromises = users.map(async (user) => {
          const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: `📝 New Blog Post: ${newBlog.title}`,
            html: emailContent
          };
          
          return sendEmail(transporter, mailOptions);
        });
        
        // Process emails in batches to avoid overwhelming the email service
        const batchSize = 10;
        const batches = [];
        for (let i = 0; i < emailPromises.length; i += batchSize) {
          batches.push(emailPromises.slice(i, i + batchSize));
        }
        
        let successCount = 0;
        let failureCount = 0;
        
        for (const batch of batches) {
          const results = await Promise.allSettled(batch);
          
          results.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value.success) {
              successCount++;
            } else {
              failureCount++;
              console.error(`❌ Failed to send email to user:`, result.reason || result.value?.error);
            }
          });
          
          // Add a small delay between batches to be respectful to the email service
          if (batches.indexOf(batch) < batches.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        console.log(`📧 Blog notification email summary:
          - Total users: ${users.length}
          - Successful emails: ${successCount}
          - Failed emails: ${failureCount}
          - Blog: "${newBlog.title}"`);
      } else {
        console.log('📧 No verified users found to notify about the new blog post');
      }
    } catch (emailError) {
      console.error('❌ Error sending blog notification emails:', emailError);
      // Don't fail the blog creation if email sending fails
    }
    
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, excerpt, content, category, image } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        excerpt,
        content,
        category,
        image
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 