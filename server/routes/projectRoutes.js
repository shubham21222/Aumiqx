const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// @desc   Get all projects
// @route  GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc   Get a single project
// @route  GET /api/projects/:id
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc   Create a new project
// @route  POST /api/projects
router.post("/", async (req, res) => {
    try {
      const data = req.body;
  
      if (Array.isArray(data)) {
        // If data is an array, validate each object
        for (const project of data) {
          if (!project.title || !project.description) {
            return res.status(400).json({ error: "Each project must have a title and description." });
          }
        }
        // Insert multiple projects at once
        const newProjects = await Project.insertMany(data);
        res.status(201).json(newProjects);
      } else {
        // If data is a single object, validate it
        if (!data.title || !data.description) {
          return res.status(400).json({ error: "Project must have a title and description." });
        }
        // Insert single project
        const newProject = new Project(data);
        await newProject.save();
        res.status(201).json(newProject);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// @desc   Update a project
// @route  PUT /api/projects/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @desc   Delete a project
// @route  DELETE /api/projects/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
