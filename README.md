# 🛒 Ecommerce Issue Tracker System

A specialized full-stack web application for tracking and managing ecommerce-related customer issues, built with HTML, CSS, JavaScript, Node.js, and Express.js without a database.

![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![Express](https://img.shields.io/badge/express-4.18.2-lightgrey)
![License](https://img.shields.io/badge/license-MIT-red.svg)

## 📝 Description

A modern, responsive ecommerce issue tracking system designed specifically for online stores. Customers can report order-related problems, and administrators can manage them through a comprehensive dashboard. All data is stored in-memory using JavaScript data structures.

## ✨ Features

### Customer Portal
- ✅ Report ecommerce-specific issues
- ✅ Auto-generated tracking ID (ISU001, ISU002, etc.)
- ✅ Order information capture (Order ID, Product Name, Purchase Amount)
- ✅ Multiple issue categories
- ✅ Form validation
- ✅ Clean, modern UI with red theme
- ✅ Mobile-responsive design

### Admin Dashboard
- ✅ Comprehensive statistics
  - Total issues count
  - Pending issues
  - In-progress issues
  - Resolved issues
  - Rejected issues
  - Urgent priority issues
- ✅ Search functionality (by ID, order ID, customer name, product)
- ✅ Filter by status (All, Pending, In Progress, Resolved, Rejected)
- ✅ Expandable issue cards with full details
- ✅ Update issue status (Pending, In Progress, Resolved, Rejected)
- ✅ Set priority levels (Low, Medium, High, Urgent)
- ✅ Delete issues with confirmation
- ✅ View order and product information

## 🛍️ Ecommerce-Specific Features

### Issue Categories
- 🚚 **Delivery Issue** - Late, lost, or incorrect delivery
- ⭐ **Product Quality** - Defects or quality problems
- ❌ **Wrong Item Received** - Incorrect product delivered
- 💳 **Payment Problem** - Billing or payment issues
- 🔄 **Return/Refund** - Return and refund requests
- 📦 **Damaged Product** - Items damaged during shipping
- 🔍 **Missing Items** - Incomplete orders
- 💬 **Other** - General inquiries

### Order Information Tracking
- Order ID
- Product Name
- Order Date
- Purchase Amount
- Customer Details

### Priority Management
- **Low** - Minor issues
- **Medium** - Standard priority (default)
- **High** - Important issues requiring attention
- **Urgent** - Critical issues needing immediate action

## 🛠️ Technology Stack

**Frontend:**
- HTML5
- CSS3 (Modern design with red gradient theme)
- Vanilla JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- In-memory data storage

## 📁 Project Structure

```
Ecommerce-compalint/
├── server.js              # Express server with ecommerce APIs
├── package.json           # Project dependencies
├── README.md             # Documentation
└── public/
    ├── index.html        # Customer issue reporting portal
    ├── admin.html        # Admin dashboard
    ├── style.css         # Ecommerce-themed styling
    └── script.js         # Admin panel functionality
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd Ecommerce-compalint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Access the application**
   - Customer Portal: http://localhost:3001/index.html
   - Admin Panel: http://localhost:3001/admin.html

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/issues` | Get all issues |
| GET | `/issues/:id` | Get issue by ID |
| POST | `/issues` | Create new issue |
| PUT | `/issues/:id` | Update issue status/priority |
| DELETE | `/issues/:id` | Delete issue |
| GET | `/categories` | Get all issue categories |

### Request/Response Examples

**POST /issues**
```json
{
  "customerName": "John Smith",
  "email": "john@example.com",
  "orderId": "ORD-12345",
  "productName": "Wireless Headphones",
  "category": "Delivery Issue",
  "issueDescription": "Package not delivered...",
  "orderDate": "2026-01-15",
  "purchaseAmount": 89.99
}
```

**Response:**
```json
{
  "id": 1,
  "customerName": "John Smith",
  "email": "john@example.com",
  "orderId": "ORD-12345",
  "productName": "Wireless Headphones",
  "category": "Delivery Issue",
  "issueDescription": "Package not delivered...",
  "orderDate": "2026-01-15T00:00:00.000Z",
  "purchaseAmount": 89.99,
  "status": "pending",
  "priority": "medium",
  "createdAt": "2026-02-10T12:00:00.000Z"
}
```

**PUT /issues/:id (Update Status)**
```json
{
  "status": "resolved"
}
```

**PUT /issues/:id (Update Priority)**
```json
{
  "priority": "urgent"
}
```

## 🎨 Design Features

### Modern Ecommerce UI/UX
- **Red Gradient Header** with animated shopping icon
- **Glassmorphism Effects** on navigation
- **Two-Column Form Layout** for better organization
- **Category Selector** with emoji icons
- **Color-coded Status & Priority Badges**
- **Expandable Issue Cards** with detailed information
- **Smooth Animations** throughout

### Responsive Design
- 📱 Mobile devices (320px - 767px)
- 📱 Tablets (768px - 1199px)  
- 💻 Desktop (1200px+)

## 🎯 Use Cases

1. **Online Retailers** - Handle customer complaints and order issues
2. **Marketplace Platforms** - Track seller and product issues
3. **Dropshipping Businesses** - Manage delivery and quality complaints
4. **Subscription Services** - Handle billing and product issues
5. **Digital Products** - Track download and access problems

## 🔒 Data & Constraints

✅ No database - uses in-memory storage  
✅ No frontend frameworks  
✅ Vanilla JavaScript only  
✅ RESTful API design  
✅ CORS enabled for development  

⚠️ **Note:** Data is lost when server restarts (in-memory storage)

## 🆚 Differences from General Complaint Tracker

| Feature | General Tracker | Ecommerce Tracker |
|---------|----------------|-------------------|
| Primary Focus | Any complaints | Order/product issues |
| Key Fields | Name, email, complaint | Order ID, product, category |
| Categories | Generic | Ecommerce-specific (8 types) |
| Priority System | ❌ No | ✅ Yes (4 levels) |
| Status | 3 states | 4 states (+ In Progress) |
| Theme Color | Blue | Red |
| Port | 3000 | 3001 |
| Additional Info | Basic | Order date, amount |

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as a specialized ecommerce solution based on the complaint tracker system.

## 🙏 Acknowledgments

- Designed for ecommerce businesses and online retailers
- Built following RESTful API best practices
- Optimized for customer service workflows

---

**Server Port:** 3001 (Different from general complaint tracker on 3000)  
**Theme:** Red gradient (Ecommerce branding)  
**Focus:** Order and product issue management
