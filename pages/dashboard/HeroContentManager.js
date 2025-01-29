'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/app/admin/components/DashboardLayout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const HeroContentManager = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    users: [],
    shapeImg: '',
  });
  const { token } = useSelector((state) => state?.auth);

  // Fetch hero content
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hero-content');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching hero content:', error);
        toast.error('Failed to fetch hero content');
      }
    };
    fetchHeroContent();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/hero-content', formData, {
        headers: { Authorization: `${token}` },
      });
      toast.success('Hero content updated successfully!');
    } catch (error) {
      console.error('Error updating hero content:', error);
      toast.error('Failed to update hero content');
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Manage Hero Content</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />    
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-medium">Users (comma-separated URLs)</label>
          <input
            type="text"
            name="users"
            value={formData?.users?.join(',')}
            onChange={(e) =>
              setFormData({ ...formData, users: e.target.value.split(',') })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Shape Image URL</label>
          <input
            type="text"
            name="shapeImg"
            value={formData.shapeImg}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Hero Content
        </button>
      </form>
    </DashboardLayout>
  );
};

export default HeroContentManager;
