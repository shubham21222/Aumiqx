const express = require("express");
const Testimonial = require("../models/Testimonial");

const router = express.Router();

// Create a new testimonial (accepts both single object and array)
router.post("/", async (req, res) => {
    try {
        let data = req.body;
        
        // If data is not an array, convert it into an array
        if (!Array.isArray(data)) {
            data = [data];
        }

        // Insert testimonials
        const testimonials = await Testimonial.insertMany(data);
        res.status(201).json({ success: true, data: testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all testimonials
router.get("/", async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json({ success: true, data: testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get a single testimonial by ID
router.get("/:id", async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }
        res.status(200).json({ success: true, data: testimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update a testimonial
router.put("/:id", async (req, res) => {
    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedTestimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }
        res.status(200).json({ success: true, data: updatedTestimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a testimonial
router.delete("/:id", async (req, res) => {
    try {
        const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!deletedTestimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }
        res.status(200).json({ success: true, message: "Testimonial deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
