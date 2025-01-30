const mongoose = require("mongoose");

const SkillProgressSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  progress: { type: Number, required: true, min: 0, max: 100 },
});

module.exports = mongoose.model("SkillProgress", SkillProgressSchema);