import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Industry Insights', 'Marketing', 'Digital Marketing', 'Technology']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  }
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema); 