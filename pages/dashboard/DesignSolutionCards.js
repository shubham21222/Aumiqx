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
            <div className="design-solution-cards p-6">
                <h2 className="text-xl font-bold mb-4">Manage Services</h2>

                {/* Form for Adding/Editing Services */}
                <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-lg">
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="block w-full mb-2 p-2 border rounded"/>
                    <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="block w-full mb-2 p-2 border rounded"/>
                    <input type="text" name="icon" placeholder="Icon Class (e.g., icon-design-tools)" value={formData.icon} onChange={handleChange} required className="block w-full mb-2 p-2 border rounded"/>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editId ? "Update" : "Add"} Service</button>
                </form>

                {/* Display Services */}
                <div className="grid grid-cols-3 gap-4">
                    {services.map((service) => (
                        <div key={service._id} className="p-4 border rounded shadow">
                            <i className={`${service.icon} text-3xl mb-2`}></i>
                            <h3 className="font-bold">{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="mt-2">
                                <button onClick={() => handleEdit(service)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(service._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DesignSolutionCards;
