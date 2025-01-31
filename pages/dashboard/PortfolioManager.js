"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/app/admin/components/DashboardLayout";

const PortfolioManager = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [formData, setFormData] = useState({ 
        title: "", 
        description: "", 
        image: null // For file upload
    });
    const [editId, setEditId] = useState(null);

    // Fetch portfolios
    useEffect(() => {
        fetch("http://localhost:5000/api/portfolios")
            .then((res) => res.json())
            .then((data) => setPortfolios(data))
            .catch((err) => console.error(err));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] }); // Handle file upload
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Add or update portfolio
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        if (formData.image) {
            formDataToSend.append("image", formData.image); // Append the image file
        }

        const method = editId ? "PUT" : "POST";
        const url = editId 
            ? `http://localhost:5000/api/portfolios/${editId}` 
            : "http://localhost:5000/api/portfolios";

        const response = await fetch(url, {
            method,
            body: formDataToSend, // Send FormData instead of JSON
        });

        const newPortfolio = await response.json();

        if (editId) {
            setPortfolios(portfolios.map((p) => (p._id === editId ? newPortfolio : p)));
        } else {
            setPortfolios([...portfolios, newPortfolio]);
        }

        setFormData({ title: "", description: "", image: null });
        setEditId(null);
    };

    // Delete portfolio
    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/portfolios/${id}`, { method: "DELETE" });
        setPortfolios(portfolios.filter((p) => p._id !== id));
    };

    // Set portfolio for editing
    const handleEdit = (portfolio) => {
        setFormData({ 
            title: portfolio.title, 
            description: portfolio.description, 
            image: null // Reset image for editing
        });
        setEditId(portfolio._id);
    };

    return (
        <DashboardLayout>
            <div className="p-8 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Portfolio</h2>

                {/* Form for Adding/Editing Portfolios */}
                <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Portfolio Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            name="description"
                            placeholder="Portfolio Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            {editId ? "Update Portfolio" : "Add Portfolio"}
                        </button>
                    </div>
                </form>

                {/* Display Portfolios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolios.map((portfolio) => (
                        <div key={portfolio._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={portfolio.image} // Assuming the API returns the image URL
                                alt={portfolio.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{portfolio.title}</h3>
                            <p className="text-gray-600 line-clamp-3">{portfolio.description}</p>
                            <div className="flex justify-center space-x-3 mt-4">
                                <button
                                    onClick={() => handleEdit(portfolio)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(portfolio._id)}
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

export default PortfolioManager;