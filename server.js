// Load environment variables
require('dotenv').config();

// Use controller for issue logic
const complaintController = require('./controllers/complaint.controller');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection with proper error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-issue';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Exit if database connection fails
    });

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// CORS middleware - restrict in production
app.use((req, res, next) => {
    const allowedOrigins = process.env.NODE_ENV === 'production'
        ? ['https://yourdomain.com'] // Replace with your production domain
        : [
            'http://localhost:3001',
            'http://127.0.0.1:3001',
            'http://localhost:5500',
            'http://127.0.0.1:5500',
            'http://localhost:5501',
            'http://127.0.0.1:5501',
            'http://localhost:5502',
            'http://127.0.0.1:5502'
        ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin || '*');
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API Routes
app.get('/issues', complaintController.getAllIssues);
app.get('/issues/:id', complaintController.getIssueById);
app.post('/issues', complaintController.createIssue);
app.put('/issues/:id', complaintController.updateIssue);
app.delete('/issues/:id', complaintController.deleteIssue);

// Issue categories endpoint
const ISSUE_CATEGORIES = [
    'Delivery Issue',
    'Product Quality',
    'Wrong Item Received',
    'Payment Problem',
    'Return/Refund',
    'Damaged Product',
    'Missing Items',
    'Other'
];

app.get('/categories', (req, res) => {
    res.json(ISSUE_CATEGORIES);
});

// Start server only after successful database connection
const server = app.listen(PORT, () => {
    console.log(`🚀 Ecommerce Issue Tracker Server is running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n⏳ Shutting down gracefully...');
    await mongoose.connection.close();
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});
