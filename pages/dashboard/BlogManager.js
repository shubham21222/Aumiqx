"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/app/admin/components/DashboardLayout";

const BlogManager = () => {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({ 
        title: "", 
        content: "", 
        author: "", 
        coverImage: "" 
    });
    const [editId, setEditId] = useState(null);

    // Fetch blogs
    useEffect(() => {
        fetch("http://localhost:5000/api/blogs")
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((err) => console.error(err));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add or update blog
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? "PUT" : "POST";
        const url = editId 
            ? `http://localhost:5000/api/blogs/${editId}` 
            : "http://localhost:5000/api/blogs";

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const newBlog = await response.json();

        if (editId) {
            setBlogs(blogs.map((b) => (b._id === editId ? newBlog : b)));
        } else {
            setBlogs([...blogs, newBlog]);
        }

        setFormData({ title: "", content: "", author: "", coverImage: "" });
        setEditId(null);
    };

    // Delete blog
    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/blogs/${id}`, { method: "DELETE" });
        setBlogs(blogs.filter((b) => b._id !== id));
    };

    // Set blog for editing
    const handleEdit = (blog) => {
        setFormData({ 
            title: blog.title, 
            content: blog.content, 
            author: blog.author, 
            coverImage: blog.coverImage 
        });
        setEditId(blog._id);
    };

    return (
        <DashboardLayout>
            <div className="p-8 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Blog Posts</h2>

                {/* Form for Adding/Editing Blogs */}
                <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Blog Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            name="content"
                            placeholder="Blog Content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="6"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="author"
                            placeholder="Author Name"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="coverImage"
                            placeholder="Cover Image URL"
                            value={formData.coverImage}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            {editId ? "Update Blog Post" : "Add Blog Post"}
                        </button>
                    </div>
                </form>

                {/* Display Blogs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                            <p className="text-gray-600 mb-2">By {blog.author}</p>
                            <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
                            <div className="flex justify-center space-x-3">
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BlogManager;