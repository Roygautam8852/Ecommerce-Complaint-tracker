// Use controller for issue logic
const complaintController = require('./controllers/complaint.controller');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/Ecommerce-issue-tracker';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
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


app.get('/issues', complaintController.getAllIssues);


app.get('/issues/:id', complaintController.getIssueById);


app.post('/issues', complaintController.createIssue);



app.put('/issues/:id', complaintController.updateIssue);


app.delete('/issues/:id', complaintController.deleteIssue);

app.get('/categories', (req, res) => {
    res.json(ISSUE_CATEGORIES);
});

// Start server
app.listen(PORT, () => {
    console.log(`Ecommerce Issue Tracker Server is running on http://localhost:${PORT}`);
});
