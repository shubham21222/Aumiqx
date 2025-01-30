const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, default:null }, // Store image URL or path
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
