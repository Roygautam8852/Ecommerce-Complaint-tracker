// Ecommerce Admin Panel JavaScript

let allIssues = [];
let currentFilter = 'all';

// Load all issues when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadIssues();

    // Add filter button event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });

    // Add search input event listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
});

// Function to load and display all issues
async function loadIssues() {
    const container = document.getElementById('issuesContainer');

    try {
        container.innerHTML = '<p class="loading">Loading issues...</p>';

        const response = await fetch('https://ecommerce-issue-tracker.onrender.com/issues');
        allIssues = await response.json();

        updateStats(allIssues);
        displayIssues(allIssues);

    } catch (error) {
        container.innerHTML = '<p class="message error">Error loading issues</p>';
        console.error('Error:', error);
    }
}

// Function to update dashboard statistics
function updateStats(issues) {
    const total = issues.length;
    const pending = issues.filter(i => i.status === 'pending').length;
    const inProgress = issues.filter(i => i.status === 'in-progress').length;
    const resolved = issues.filter(i => i.status === 'resolved').length;
    const rejected = issues.filter(i => i.status === 'rejected').length;
    const urgent = issues.filter(i => i.priority === 'urgent').length;

    document.getElementById('totalCount').textContent = total;
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('inProgressCount').textContent = inProgress;
    document.getElementById('resolvedCount').textContent = resolved;
    document.getElementById('rejectedCount').textContent = rejected;
    document.getElementById('urgentCount').textContent = urgent;
}

// Function to display issues in cards view
function displayIssues(issues) {
    const container = document.getElementById('issuesContainer');

    if (issues.length === 0) {
        container.innerHTML = '<p class="no-issues">No issues found</p>';
        displayIssuesTable([]);
        return;
    }

    container.innerHTML = issues.map(issue => createIssueHTML(issue)).join('');
    displayIssuesTable(issues);
}

// Function to display issues in table view
function displayIssuesTable(issues) {
    const tbody = document.getElementById('tableBody');

    if (issues.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="no-issues">No issues found</td></tr>';
        return;
    }

    tbody.innerHTML = issues.map(issue => {
        const date = new Date(issue.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const issueIdDisplay = issue.issueId || issue._id.slice(0, 8);

        return `
            <tr>
                <td class="tracking-id">${issueIdDisplay}</td>
                <td>${issue.category}</td>
                <td>${issue.customerName}</td>
                <td>${issue.orderId}</td>
                <td>${issue.productName}</td>
                <td><span class="status-badge status-${issue.status}">${issue.status.replace('-', ' ')}</span></td>
                <td><span class="priority-badge priority-${issue.priority}">${issue.priority}</span></td>
                <td>${date}</td>
                <td class="table-actions">
                    <select class="table-select" onchange="updateStatus('${issue._id}', this.value);">
                        <option value="">Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <select class="table-select" onchange="updatePriority('${issue._id}', this.value);">
                        <option value="">Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                    <button class="table-btn-delete" onclick="deleteIssue('${issue._id}')">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Function to switch between cards and table view
function switchView(view) {
    const cardViewBtn = document.getElementById('cardViewBtn');
    const tableViewBtn = document.getElementById('tableViewBtn');
    const issuesContainer = document.getElementById('issuesContainer');
    const tableContainer = document.getElementById('tableContainer');

    if (view === 'cards') {
        issuesContainer.style.display = 'block';
        tableContainer.style.display = 'none';
        cardViewBtn.classList.add('active');
        tableViewBtn.classList.remove('active');
    } else if (view === 'table') {
        issuesContainer.style.display = 'none';
        tableContainer.style.display = 'block';
        tableViewBtn.classList.add('active');
        cardViewBtn.classList.remove('active');
    }
}

// Function to create HTML for an issue card
function createIssueHTML(issue) {
    const date = new Date(issue.createdAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const orderDate = issue.orderDate ? new Date(issue.orderDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : 'N/A';
    // Show the user-friendly issueId if present, else fallback to _id
    const issueIdDisplay = issue.issueId || issue._id;
    return `
        <div class="issue-card" data-id="${issue._id}">
            <div class="issue-header" onclick="toggleDetails('${issue._id}')">
                <div>
                    <div class="issue-id">${issueIdDisplay}</div>
                    <h3 class="issue-title">${issue.category}</h3>
                    <div class="issue-meta">
                        <div class="meta-item">
                            <span class="meta-icon">Customer Name:</span>
                            <span>${issue.customerName}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">Order ID:</span>
                            <span>${issue.orderId}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">Product:</span>
                            <span>${issue.productName}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">Reported:</span>
                            <span>${date}</span>
                        </div>
                    </div>
                </div>
                <div class="badge-group">
                    <span class="status-badge status-${issue.status}">${issue.status.replace('-', ' ')}</span>
                    <span class="priority-badge priority-${issue.priority}">${issue.priority}</span>
                </div>
            </div>
            <div class="issue-details" id="details-${issue._id}">
                <div class="detail-section">
                    <div class="detail-label">Email:</div>
                    <div class="detail-value">${issue.email}</div>
                </div>
                <div class="detail-section">
                    <div class="detail-label">Order Date:</div>
                    <div class="detail-value">${orderDate}</div>
                </div>
                <div class="detail-section">
                    <div class="detail-label">Purchase Amount:</div>
                    <div class="detail-value">₹${issue.purchaseAmount.toFixed(2)}</div>
                </div>
                <div class="detail-section">
                    <div class="detail-label">Issue Description:</div>
                    <div class="issue-description">
                        ${issue.issueDescription}
                    </div>
                </div>
                <div class="issue-actions">
                    <button class="action-btn btn-in-progress" onclick="updateStatus('${issue._id}', 'in-progress')">
                        In Progress
                    </button>
                    <button class="action-btn btn-resolved" onclick="updateStatus('${issue._id}', 'resolved')">
                        Resolved
                    </button>
                    <button class="action-btn btn-pending" onclick="updateStatus('${issue._id}', 'pending')">
                        Pending
                    </button>
                    <button class="action-btn btn-rejected" onclick="updateStatus('${issue._id}', 'rejected')">
                        Reject
                    </button>
                    <select class="action-btn btn-priority" onchange="updatePriority('${issue._id}', this.value)">
                        <option value="">Set Priority</option>
                        <option value="low" ${issue.priority === 'low' ? 'selected' : ''}>Low</option>
                        <option value="medium" ${issue.priority === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="high" ${issue.priority === 'high' ? 'selected' : ''}>High</option>
                        <option value="urgent" ${issue.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
                    </select>
                    <button class="action-btn btn-delete" onclick="deleteIssue('${issue._id}')">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to toggle issue details
function toggleDetails(id) {
    const details = document.getElementById(`details-${id}`);
    details.classList.toggle('expanded');
}

// Function to handle filter buttons
function handleFilter(e) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    currentFilter = e.target.dataset.filter;
    applyFilters();
}

// Function to handle search
function handleSearch(e) {
    applyFilters();
}

// Function to apply filters and search
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    let filtered = allIssues;

    // Apply status filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(i => i.status === currentFilter);
    }

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(i => {
            // Fixed: Use issueId or _id from the issue object
            const issueId = (i.issueId || i._id).toLowerCase();
            const customerName = i.customerName.toLowerCase();
            const orderId = i.orderId.toLowerCase();
            const productName = i.productName.toLowerCase();
            const category = i.category.toLowerCase();

            return issueId.includes(searchTerm) ||
                customerName.includes(searchTerm) ||
                orderId.includes(searchTerm) ||
                productName.includes(searchTerm) ||
                category.includes(searchTerm);
        });
    }

    displayIssues(filtered);
}

// Function to handle status update
async function updateStatus(id, status) {
    // Show loading state
    const issueCard = document.querySelector(`[data-id="${id}"]`);
    if (issueCard) {
        issueCard.style.opacity = '0.5';
        issueCard.style.pointerEvents = 'none';
    }

    try {
        const response = await fetch(`https://ecommerce-issue-tracker.onrender.com/issues/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        if (response.ok) {
            await loadIssues();
        } else {
            const data = await response.json();
            alert(data.message || 'Error updating issue');
            // Restore card state on error
            if (issueCard) {
                issueCard.style.opacity = '1';
                issueCard.style.pointerEvents = 'auto';
            }
        }
    } catch (error) {
        alert('Error connecting to server');
        console.error('Error:', error);
        // Restore card state on error
        if (issueCard) {
            issueCard.style.opacity = '1';
            issueCard.style.pointerEvents = 'auto';
        }
    }
}

// Function to handle priority update
async function updatePriority(id, priority) {
    if (!priority) return;

    // Show loading state
    const issueCard = document.querySelector(`[data-id="${id}"]`);
    if (issueCard) {
        issueCard.style.opacity = '0.5';
        issueCard.style.pointerEvents = 'none';
    }

    try {
        const response = await fetch(`https://ecommerce-issue-tracker.onrender.com/issues/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ priority })
        });

        if (response.ok) {
            await loadIssues();
        } else {
            const data = await response.json();
            alert(data.message || 'Error updating priority');
            // Restore card state on error
            if (issueCard) {
                issueCard.style.opacity = '1';
                issueCard.style.pointerEvents = 'auto';
            }
        }
    } catch (error) {
        alert('Error connecting to server');
        console.error('Error:', error);
        // Restore card state on error
        if (issueCard) {
            issueCard.style.opacity = '1';
            issueCard.style.pointerEvents = 'auto';
        }
    }
}

// Function to handle delete
async function deleteIssue(id) {
    // Fixed: Find the issue to get the correct issueId
    const issue = allIssues.find(i => i._id === id);
    const issueId = issue?.issueId || id;

    if (!confirm(`Are you sure you want to delete issue ${issueId}?`)) {
        return;
    }

    // Show loading state
    const issueCard = document.querySelector(`[data-id="${id}"]`);
    if (issueCard) {
        issueCard.style.opacity = '0.5';
        issueCard.style.pointerEvents = 'none';
    }

    try {
        const response = await fetch(`https://ecommerce-issue-tracker.onrender.com/issues/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await loadIssues();
        } else {
            const data = await response.json();
            alert(data.message || 'Error deleting issue');
            // Restore card state on error
            if (issueCard) {
                issueCard.style.opacity = '1';
                issueCard.style.pointerEvents = 'auto';
            }
        }
    } catch (error) {
        alert('Error connecting to server');
        console.error('Error:', error);
        // Restore card state on error
        if (issueCard) {
            issueCard.style.opacity = '1';
            issueCard.style.pointerEvents = 'auto';
        }
    }
}
