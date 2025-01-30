'use client'
import { useEffect, useState } from "react";
import DashboardLayout from "@/app/admin/components/DashboardLayout";

const DesignSolutionCards = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "", icon: "" });
    const [editId, setEditId] = useState(null);

    // Fetch services
    useEffect(() => {
        fetch("http://localhost:5000/api/services")
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((err) => console.error(err));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add or update service
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? "PUT" : "POST";
        const url = editId ? `http://localhost:5000/api/services/${editId}` : "http://localhost:5000/api/services";

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const newService = await response.json();

        if (editId) {
            setServices(services.map((s) => (s._id === editId ? newService : s)));
        } else {
            setServices([...services, newService]);
        }

        setFormData({ title: "", description: "", icon: "" });
        setEditId(null);
    };

    // Delete service
    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/services/${id}`, { method: "DELETE" });
        setServices(services.filter((s) => s._id !== id));
    };

    // Set service for editing
    const handleEdit = (service) => {
        setFormData({ title: service.title, description: service.description, icon: service.icon });
        setEditId(service._id);
    };

    return (
        <DashboardLayout>
            <div className="p-8 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Services</h2>

                {/* Form for Adding/Editing Services */}
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
                            name="icon"
                            placeholder="Icon Class (e.g., icon-design-tools)"
                            value={formData.icon}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            {editId ? "Update Service" : "Add Service"}
                        </button>
                    </div>
                </form>

                {/* Display Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="text-center">
                                <i className={`${service.icon} text-4xl text-blue-600 mb-4`}></i>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <div className="flex justify-center space-x-3">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DesignSolutionCards;