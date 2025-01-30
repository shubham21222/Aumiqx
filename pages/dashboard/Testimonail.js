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
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Manage Testimonials</h2>

        {/* Form for Adding/Editing Testimonials */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-gray-100 p-4 rounded-lg"
        >
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="block w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="block w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="block w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
            className="block w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="block w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="img"
            placeholder="Image URL"
            value={formData.img}
            onChange={handleChange}
            className="block w-full mb-2 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editId ? "Update" : "Add"} Testimonial
          </button>
        </form>

        {/* Display Testimonials */}
        <div className="grid grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="p-4 border rounded shadow">
              <img
                src={testimonial.img}
                alt={testimonial.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-bold">{testimonial.title}</h3>
              <p className="italic">"{testimonial.description}"</p>
              <p className="text-sm">
                - {testimonial.author}, {testimonial.designation}
              </p>
              <p className="text-yellow-500 font-bold">
                Rating: {testimonial.rating} ⭐
              </p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
