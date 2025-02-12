"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/app/admin/components/DashboardLayout";

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "", img: "" });
    const [editId, setEditId] = useState(null);

    // Fetch projects
    useEffect(() => {
        fetch("http://localhost:5000/api/projects")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error(err));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add or update project
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? "PUT" : "POST";
        const url = editId ? `http://localhost:5000/api/projects/${editId}` : "http://localhost:5000/api/projects";

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const newProject = await response.json();

        if (editId) {
            setProjects(projects.map((p) => (p._id === editId ? newProject : p)));
        } else {
            setProjects([...projects, newProject]);
        }

        setFormData({ title: "", description: "", img: "" });
        setEditId(null);
    };

    // Delete project
    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/projects/${id}`, { method: "DELETE" });
        setProjects(projects.filter((p) => p._id !== id));
    };

    // Set project for editing
    const handleEdit = (project) => {
        setFormData({ title: project.title, description: project.description, img: project.img });
        setEditId(project._id);
    };

    return (
        <DashboardLayout>
            <div className="p-8 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Projects</h2>

                {/* Form for Adding/Editing Projects */}
                <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="img"
                            placeholder="Image URL"
                            value={formData.img}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            {editId ? "Update Project" : "Add Project"}
                        </button>
                    </div>
                </form>

                {/* Display Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={project.img}
                                alt={project.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex justify-center space-x-3">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
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

export default ProjectsManager;