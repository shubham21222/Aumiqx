"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/app/admin/components/DashboardLayout";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    rating: "",
    title: "",
    description: "",
    author: "",
    designation: "",
    img: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch testimonials
  useEffect(() => {
    fetch("http://localhost:5000/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setTestimonials(data.data);
        } else {
          console.error("Invalid response format:", data);
          setTestimonials([]); // Handle incorrect data format
        }
      })
      .catch((err) => {
        console.error("Error fetching testimonials:", err);
        setTestimonials([]); // Handle fetch error
      });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/testimonials/${editId}`
      : "http://localhost:5000/api/testimonials";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const newTestimonial = await response.json();

    if (editId) {
      setTestimonials(
        testimonials.map((t) => (t._id === editId ? newTestimonial : t))
      );
    } else {
      setTestimonials([...testimonials, newTestimonial]);
    }

    setFormData({
      rating: "",
      title: "",
      description: "",
      author: "",
      designation: "",
      img: "",
    });
    setEditId(null);
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/testimonials/${id}`, {
      method: "DELETE",
    });
    setTestimonials(testimonials.filter((t) => t._id !== id));
  };

  // Set testimonial for editing
  const handleEdit = (testimonial) => {
    setFormData({
      rating: testimonial.rating,
      title: testimonial.title,
      description: testimonial.description,
      author: testimonial.author,
      designation: testimonial.designation,
      img: testimonial.img,
    });
    setEditId(testimonial._id);
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Manage Testimonials
        </h2>

        {/* Form for Adding/Editing Testimonials */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="5"
            />
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
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
          >
            {editId ? "Update Testimonial" : "Add Testimonial"}
          </button>
        </form>

        {/* Display Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={testimonial.img}
                alt={testimonial.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {testimonial.title}
              </h3>
              <p className="italic text-gray-600 mb-4">
                "{testimonial.description}"
              </p>
              <p className="text-sm text-gray-700 mb-2">
                - {testimonial.author}, {testimonial.designation}
              </p>
              <p className="text-yellow-500 font-bold">
                Rating: {testimonial.rating} ⭐
              </p>
              <div className="mt-4 flex justify-center space-x-3">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
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

export default Testimonial;