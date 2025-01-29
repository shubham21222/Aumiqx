const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new service
router.post("/", async (req, res) => {
    try {
      const services = req.body; // Expecting an array of services
      if (!Array.isArray(services) || services.length === 0) {
        return res.status(400).json({ error: "Request body must be an array with at least one service." });
      }
  
      const newServices = await Service.insertMany(services); // Bulk insert
      res.status(201).json(newServices);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Update a service
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
