'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from "@/app/admin/components/DashboardLayout";
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Use for notifications
import { useSelector } from 'react-redux';

const Content = () => {
  const [contentList, setContentList] = useState([]);
  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({
    page: '',
    section: '',
    text: '',
    image: '',
  });
  const { token } = useSelector((state) => state?.auth); // Get token from Redux

  // Axios instance with token in headers
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/content',
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to Authorization header
    },
  });

  // Fetch all content
  const fetchContent = async () => {
    try {
      const response = await axiosInstance.get('/');
      setContentList(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch content');
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for create/edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingContent) {
        // Edit existing content
        await axiosInstance.put(`/${editingContent._id}`, formData);
        toast.success('Content updated successfully!');
      } else {
        // Create new content
        await axiosInstance.post('/', formData);
        toast.success('Content created successfully!');
      }
      fetchContent();
      setEditingContent(null);
      setFormData({ page: '', section: '', text: '', image: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit content');
    }
  };

  // Handle delete content
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/${id}`);
      toast.success('Content deleted successfully!');
      fetchContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
    }
  };

  // Set editing content
  const startEditing = (content) => {
    setEditingContent(content);
    setFormData(content);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Manage Content</h1>

      {/* Form for creating or editing content */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded">
        <div>
          <label className="block mb-1 font-medium">Page</label>
          <input
            type="text"
            name="page"
            value={formData.page}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Section</label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editingContent ? 'Update Content' : 'Create Content'}
        </button>
      </form>

      {/* List of content */}
      <div className="mt-8">
        {contentList.map((content) => (
          <div key={content._id} className="p-4 bg-gray-100 rounded mb-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{content.page} - {content.section}</h2>
              <p>{content.text}</p>
              {content.image && <img src={content.image} alt="Content" className="mt-2 w-32 h-32 object-cover" />}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEditing(content)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(content._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Content;
