const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  section: { type: String, required: true },
  text: { type: String },
  image: { type: String },
});

const HeroContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  users: { type: Number },
  shapeImg: { type: String },
});

const Content = mongoose.model('Content', ContentSchema);
const HeroContent = mongoose.model('HeroContent', HeroContentSchema);

module.exports = { Content, HeroContent };
