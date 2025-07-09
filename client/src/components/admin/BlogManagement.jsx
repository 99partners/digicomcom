import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2, Edit, Plus } from 'lucide-react';
import axiosInstance from '../../config/api.config';
import BlogForm from './BlogForm';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get('/api/blogs');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/blogs/${blogId}`);
      toast.success('Blog deleted successfully');
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      let response;
      if (editingBlog) {
        response = await axiosInstance.put(`/api/blogs/${editingBlog._id}`, formData);
        setBlogs(blogs.map(blog => 
          blog._id === editingBlog._id ? response.data.blog : blog
        ));
        toast.success('Blog updated successfully');
      } else {
        response = await axiosInstance.post('/api/blogs', formData);
        setBlogs([...blogs, response.data.blog]);
        toast.success('Blog created successfully');
      }
      setShowForm(false);
      setEditingBlog(null);
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (showForm) {
    return (
      <BlogForm
        blog={editingBlog}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setShowForm(false);
          setEditingBlog(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Blog
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {blogs.map((blog) => (
            <li key={blog._id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {blog.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
          {blogs.length === 0 && (
            <li className="px-6 py-4 text-center text-gray-500">
              No blogs found. Create one to get started.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BlogManagement; 