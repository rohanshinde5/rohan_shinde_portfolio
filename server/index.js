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

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Allow local dev AND any Vercel deployment URL (set ALLOWED_ORIGIN in production)
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://rohan-shinde-portfolio-one.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin "${origin}" not allowed`));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ─── Database ─────────────────────────────────────────────────────────────────
console.log("Connecting to MongoDB...");
console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
  });

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: "Rohan Shinde Portfolio API",
    endpoints: { submitContact: 'POST /api/contact' },
  });
});

app.use('/api/contact', contactRoutes);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api`);
});

// Graceful EADDRINUSE handling — avoids crashing the whole process
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different PORT in .env`);
    process.exit(1);
  } else {
    throw err;
  }
});
