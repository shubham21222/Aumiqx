const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serviceRoutes = require("./routes/serviceRoutes");

require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const heroContentRoutes = require('./routes/content');

app.use('/api/auth', authRoutes);
app.use('/api', heroContentRoutes); // Register the hero content route
app.use("/api/services", serviceRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
