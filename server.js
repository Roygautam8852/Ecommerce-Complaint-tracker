// Use controller for issue logic
const complaintController = require('./controllers/complaint.controller');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/worksetu';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Issue Schema
const issueSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    issueDescription: { type: String, required: true },
    orderDate: { type: String },
    purchaseAmount: { type: Number, default: 0 },
    status: { type: String, default: 'pending' },
    priority: { type: String, default: 'medium' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});
const Issue = mongoose.model('Issue', issueSchema);

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
