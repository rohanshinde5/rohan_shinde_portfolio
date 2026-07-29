import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Vite dev client origins
  credentials: true,
}));
app.use(express.json());

// Database connection
console.log('Connecting to MongoDB...');
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB successfully: ${MONGODB_URI}`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB. Make sure MongoDB service is running:', err.message);
  });

// Root route (API health check)
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: "Rohan Shinde's Portfolio Backend REST API",
    endpoints: {
      submitContact: 'POST /api/contact'
    }
  });
});

// Routes
app.use('/api/contact', contactRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint available at: http://localhost:${PORT}/api`);
});
