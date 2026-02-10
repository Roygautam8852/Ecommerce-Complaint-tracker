const express = require('express');
const app = express();
const PORT = 3001;

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

let issues = [];
let issueIdCounter = 1;

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

app.get('/issues', (req, res) => {
    res.json(issues);
});

app.get('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const issue = issues.find(i => i.id === id);
    
    if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
    }
    
    res.json(issue);
});

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

app.delete('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = issues.findIndex(i => i.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: 'Issue not found' });
    }
    
    const deletedIssue = issues.splice(index, 1)[0];
    res.json({ message: 'Issue deleted successfully', issue: deletedIssue });
});

app.get('/categories', (req, res) => {
    res.json(ISSUE_CATEGORIES);
});

// Start server
app.listen(PORT, () => {
    console.log(`Ecommerce Issue Tracker Server is running on http://localhost:${PORT}`);
});
