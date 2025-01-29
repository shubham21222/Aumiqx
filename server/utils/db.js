const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://shubhamraikwar08j:dH8a0Awn9TKC0h09@cluster0.9owlu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
