const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const assetRoutes = require('./routes/assetRoutes');
const vulnerabilityRoutes = require('./routes/vulnerabilityRoutes');
const controlRoutes = require('./routes/controlRoutes');
const riskRoutes = require('./routes/riskRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Backend Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/assets', assetRoutes);
app.use('/api/vulnerabilities', vulnerabilityRoutes);
app.use('/api/controls', controlRoutes);
app.use('/api/risks', riskRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;