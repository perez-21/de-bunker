const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { NODE_ENV } = require('./config/config');

const connectDB = require('./config/database');
// const blockchainService = require('./services/blockchainService');

// Route imports
// const authRoutes = require('./routes/auth');
// const walletRoutes = require('./routes/wallet');
const ipfsRoutes = require('./routes/ipfs');
const userRoutes = require('./routes/users');
const credentialRoutes = require('./routes/credentials');

const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended: true}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/wallet', walletRoutes);

app.use('/api/v1/ipfs', ipfsRoutes) // dummy ipfs
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/credentials', credentialRoutes)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Setup blockchain event listeners
// blockchainService.setupEventListeners();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// 404 handler
// Catch-all 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;

