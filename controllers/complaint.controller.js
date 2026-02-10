// complaint.controller.js
// Controller for handling issue logic with MongoDB

const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issueId: { type: String, unique: true }, // User-friendly ID like ISU001
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

const Issue = mongoose.models.Issue || mongoose.model('Issue', issueSchema);

module.exports = {
    getAllIssues: async (req, res) => {
        try {
            const issues = await Issue.find();
            res.json(issues);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching issues', error: err.message });
        }
    },
    getIssueById: async (req, res) => {
        try {
            const issue = await Issue.findById(req.params.id);
            if (!issue) return res.status(404).json({ message: 'Issue not found' });
            res.json(issue);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching issue', error: err.message });
        }
    },
    createIssue: async (req, res) => {
        const { customerName, email, orderId, productName, category, issueDescription, orderDate, purchaseAmount } = req.body;
        if (!customerName || !email || !orderId || !productName || !category || !issueDescription) {
            return res.status(400).json({ message: 'All required fields must be filled' });
        }
        try {
            // Find the latest issueId and increment
            const lastIssue = await Issue.findOne({}).sort({ createdAt: -1 });
            let nextId = 1;
            if (lastIssue && lastIssue.issueId) {
                const match = lastIssue.issueId.match(/ISU(\d+)/);
                if (match) {
                    nextId = parseInt(match[1], 10) + 1;
                }
            }
            const issueId = `ISU${String(nextId).padStart(3, '0')}`;
            const newIssue = new Issue({
                issueId,
                customerName,
                email,
                orderId,
                productName,
                category,
                issueDescription,
                orderDate: orderDate || new Date().toISOString(),
                purchaseAmount: purchaseAmount || 0
            });
            await newIssue.save();
            res.status(201).json(newIssue);
        } catch (err) {
            res.status(500).json({ message: 'Error creating issue', error: err.message });
        }
    },
    updateIssue: async (req, res) => {
        const { status, priority } = req.body;
        try {
            const update = { updatedAt: new Date() };
            if (status) {
                if (!['pending', 'in-progress', 'resolved', 'rejected'].includes(status)) {
                    return res.status(400).json({ message: 'Invalid status' });
                }
                update.status = status;
            }
            if (priority) {
                if (!['low', 'medium', 'high', 'urgent'].includes(priority)) {
                    return res.status(400).json({ message: 'Invalid priority' });
                }
                update.priority = priority;
            }
            const issue = await Issue.findByIdAndUpdate(req.params.id, update, { new: true });
            if (!issue) return res.status(404).json({ message: 'Issue not found' });
            res.json(issue);
        } catch (err) {
            res.status(500).json({ message: 'Error updating issue', error: err.message });
        }
    },
    deleteIssue: async (req, res) => {
        try {
            const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
            if (!deletedIssue) return res.status(404).json({ message: 'Issue not found' });
            res.json({ message: 'Issue deleted successfully', issue: deletedIssue });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting issue', error: err.message });
        }
    }
};
