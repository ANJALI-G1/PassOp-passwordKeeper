import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import passwordRouter from './routes/passwordRoutes.js';

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/auth', authRouter);
app.use('/api/passwords', passwordRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;