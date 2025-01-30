const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const teamRoutes = require("./routes/teamRoutes");
const skillProgressRoutes = require("./routes/skillProgressRoutes");
const blogRoutes = require("./routes/blogRoutes");

require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const heroContentRoutes = require('./routes/content');
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', heroContentRoutes); // Register the hero content route
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/skills", skillProgressRoutes);
app.use("/api/blogs", blogRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
