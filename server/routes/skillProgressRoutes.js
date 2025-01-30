const express = require("express");
const SkillProgress = require("../models/SkillProgress");
const router = express.Router();

// Get all skill progress
router.get("/", async (req, res) => {
  try {
    const skills = await SkillProgress.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// Add new skill progress
router.post("/", async (req, res) => {
  try {
    const newSkill = new SkillProgress(req.body);
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill" });
  }
});

module.exports = router;