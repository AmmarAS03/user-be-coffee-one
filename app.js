const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectToDatabase } = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the User Authentication Service!' });
});

const PORT = process.env.USER_SERVICE_PORT || 5411;

async function startServer() {
  try {
    const db = await connectToDatabase();
    app.locals.db = db;

    app.listen(PORT, () => {
      console.log(`User Authentication Service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;