const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  img: { type: String, default:null },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "SkillProgress" }], // Reference to SkillProgress
});

module.exports = mongoose.model("Team", TeamSchema);