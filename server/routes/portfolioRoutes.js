// routes/portfolioRoutes.js
const express = require("express");
const Portfolio = require("../models/Portfolio");
const router = express.Router();

// Create a new portfolio item
router.post("/", async (req, res) => {
  try {
    const { title, description, img } = req.body;
    const newPortfolio = new Portfolio({ title, description, img });
    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio item", error });
  }
});

// Get all portfolio items
router.get("/", async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio items", error });
  }
});

// Get a single portfolio item by ID
router.get("/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio item", error });
  }
});

// Update a portfolio item by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description, img } = req.body;
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { title, description, img },
      { new: true }
    );
    if (!updatedPortfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: "Error updating portfolio item", error });
  }
});

// Delete a portfolio item by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedPortfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.status(200).json({ message: "Portfolio item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting portfolio item", error });
  }
});

module.exports = router;