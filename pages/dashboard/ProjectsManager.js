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
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Manage Projects</h2>

                {/* Form for Adding/Editing Projects */}
                <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-lg">
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="block w-full mb-2 p-2 border rounded"/>
                    <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="block w-full mb-2 p-2 border rounded"/>
                    <input type="text" name="img" placeholder="Image URL" value={formData.img} onChange={handleChange} required className="block w-full mb-2 p-2 border rounded"/>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editId ? "Update" : "Add"} Project</button>
                </form>

                {/* Display Projects */}
                <div className="grid grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div key={project._id} className="p-4 border rounded shadow">
                            <img src={project.img} alt={project.title} className="w-full h-40 object-cover mb-2 rounded"/>
                            <h3 className="font-bold">{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="mt-2">
                                <button onClick={() => handleEdit(project)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(project._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProjectsManager;
