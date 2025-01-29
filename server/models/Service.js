const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: null }, // Ensure 'icon' is optional
});

module.exports = mongoose.model("Service", serviceSchema);
