const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Enable CORS for development - MUST be before other middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory data storage
let issues = [];
let issueIdCounter = 1;

// Issue categories for ecommerce
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

// GET /issues – Get all issues
app.get('/issues', (req, res) => {
    res.json(issues);
});

// GET /issues/:id – Get issue by ID
app.get('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const issue = issues.find(i => i.id === id);
    
    if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
    }
    
    res.json(issue);
});

// POST /issues – Add new issue
app.post('/issues', (req, res) => {
    const { customerName, email, orderId, productName, category, issueDescription, orderDate, purchaseAmount } = req.body;
    
    if (!customerName || !email || !orderId || !productName || !category || !issueDescription) {
        return res.status(400).json({ message: 'All required fields must be filled' });
    }
    
    const newIssue = {
        id: issueIdCounter++,
        customerName,
        email,
        orderId,
        productName,
        category,
        issueDescription,
        orderDate: orderDate || new Date().toISOString(),
        purchaseAmount: purchaseAmount || 0,
        status: 'pending',
        priority: 'medium',
        createdAt: new Date().toISOString()
    };
    
    issues.push(newIssue);
    res.status(201).json(newIssue);
});

// PUT /issues/:id – Update issue status or priority
app.put('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { status, priority } = req.body;
    
    const issue = issues.find(i => i.id === id);
    
    if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
    }
    
    if (status) {
        if (!['pending', 'in-progress', 'resolved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        issue.status = status;
    }
    
    if (priority) {
        if (!['low', 'medium', 'high', 'urgent'].includes(priority)) {
            return res.status(400).json({ message: 'Invalid priority' });
        }
        issue.priority = priority;
    }
    
    issue.updatedAt = new Date().toISOString();
    
    res.json(issue);
});

// DELETE /issues/:id – Delete issue
app.delete('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = issues.findIndex(i => i.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: 'Issue not found' });
    }
    
    const deletedIssue = issues.splice(index, 1)[0];
    res.json({ message: 'Issue deleted successfully', issue: deletedIssue });
});

// GET /categories – Get all issue categories
app.get('/categories', (req, res) => {
    res.json(ISSUE_CATEGORIES);
});

// Start server
app.listen(PORT, () => {
    console.log(`Ecommerce Issue Tracker Server is running on http://localhost:${PORT}`);
});
