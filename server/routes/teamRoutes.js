const express = require("express");
const Team = require("../models/Team");
const SkillProgress = require("../models/SkillProgress");
const router = express.Router();

// Get all teams with their skills
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().populate("skills"); // Populate skills
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

// Add a new team
router.post("/", async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: "Failed to add team" });
  }
});


// Update a team member
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTeam = await Team.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedTeam) {
        return res.status(404).json({ error: "Team member not found" });
      }
  
      res.status(200).json(updatedTeam);
    } catch (error) {
      res.status(500).json({ error: "Failed to update team member" });
    }
  });

  // Delete a team member
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTeam = await Team.findByIdAndDelete(id);
  
      if (!deletedTeam) {
        return res.status(404).json({ error: "Team member not found" });
      }
  
      res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete team member" });
    }
  });
  
  

// Add a skill to a team member
router.post("/:teamId/skills", async (req, res) => {
  try {
    const { teamId } = req.params;
    const newSkill = new SkillProgress(req.body);
    await newSkill.save();

    // Add the skill to the team member
    const team = await Team.findById(teamId);
    team.skills.push(newSkill._id);
    await team.save();

    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill to team member" });
  }
});

module.exports = router;