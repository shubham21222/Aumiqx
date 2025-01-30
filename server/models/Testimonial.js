const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    designation: { type: String, required: true },
    img: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", TestimonialSchema);
