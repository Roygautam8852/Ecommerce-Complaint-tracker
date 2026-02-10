# 🛒 Ecommerce Issue Tracker System

A specialized full-stack web application for tracking and managing ecommerce-related customer issues, built with HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![Express](https://img.shields.io/badge/express-4.18.2-lightgrey)
![MongoDB](https://img.shields.io/badge/mongodb-persistent%20storage-green)
![License](https://img.shields.io/badge/license-MIT-red.svg)

### ✨ Quick Highlights
- 🗄️ **MongoDB Integration** - Enterprise-grade persistent database
- 📊 **Dual Views** - Cards layout for details, Table view for quick overview
- 🔗 **Sequential IDs** - User-friendly issue tracking (ISU001, ISU002...)
- 📌 **Fixed Header** - Always accessible navigation while scrolling
- 💾 **Data Persistence** - All data persists across server restarts
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

## 📝 Description

A modern, responsive ecommerce issue tracking system designed specifically for online stores. Customers can report order-related problems, and administrators can manage them through a comprehensive dashboard with MongoDB for persistent data storage, table view, and fixed navigation header.

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
- ✅ Two view modes:
  - Cards View - Expandable detailed cards
  - Table View - Compact tabular data display
- ✅ Search functionality (by ID, order ID, customer name, product)
- ✅ Filter by status (All, Pending, In Progress, Resolved, Rejected)
- ✅ Quick actions (Status dropdown, Priority select, Delete button)
- ✅ Update issue status (Pending, In Progress, Resolved, Rejected)
- ✅ Set priority levels (Low, Medium, High, Urgent)
- ✅ Fixed navigation header for easy access
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
- MongoDB (with Mongoose ODM)

## 📁 Project Structure

```
Ecommerce-compalint/
├── server.js                      # Express server with MongoDB connection
├── package.json                   # Project dependencies (mongoose, express)
├── README.md                      # Documentation
├── controllers/
│   └── complaint.controller.js    # Issue CRUD logic with Mongoose models
└── public/
    ├── index.html                 # Customer issue reporting portal
    ├── index.js                   # Customer form submission logic
    ├── admin.html                 # Admin dashboard (Cards & Table views)
    ├── script.js                  # Admin panel (filters, search, views)
    └── style.css                  # Ecommerce-themed styling with table styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local or Atlas)

### Installation

1. **Navigate to the project directory**
  ```bash
  cd Ecommerce-compalint
  ```

2. **Install dependencies**
  ```bash
  npm install
  ```

3. **Start MongoDB**
  - If using local MongoDB, ensure the MongoDB server is running:
    ```bash
    mongod
    ```
   - By default, the app connects to `mongodb://localhost:27017/worksetu`
   - To use a different MongoDB URI, update the `MONGODB_URI` constant in `server.js`:
     ```javascript
     const MONGODB_URI = 'mongodb://localhost:27017/your-database-name';
     ```
   - For MongoDB Atlas (cloud), use:
     ```javascript
     const MONGODB_URI = 'mongodb+srv://username:password@cluster.mongodb.net/database-name';
     ```

4. **Start the server**
   ```bash
   npm start
   ```
   OR
   ```bash
   node server.js
   ```

5. **Access the application**
   - Customer Portal (Report Issue): [http://localhost:3001/index.html](http://localhost:3001/index.html)
   - Admin Dashboard (View & Manage): [http://localhost:3001/admin.html](http://localhost:3001/admin.html)
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
  "_id": "507f1f77bcf86cd799439011",
  "issueId": "ISU001",
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
  "createdAt": "2026-02-10T12:00:00.000Z",
  "updatedAt": "2026-02-10T12:05:00.000Z"
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
- **Red Gradient Header** - Fixed navigation bar that stays visible while scrolling
- **Glassmorphism Effects** on navigation elements
- **Two-Column Form Layout** for better organization
- **Category Selector** with emoji icons
- **Color-coded Status & Priority Badges**
- **Dual View Modes** - Cards for detailed view, Table for quick overview
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Smooth Animations** throughout the application

### View Modes

**Cards View (Default)**
- Expandable detailed issue cards
- Full customer and order information
- Best for in-depth issue management
- Inline buttons for quick actions

**Table View**
- Compact tabular layout showing all issues
- Perfect for data analysis and quick overview
- Status dropdown and delete button in each row
- Optimized font sizes for readability
- Responsive table for mobile devices

Toggle between views using the 📋 Cards / 📊 Table buttons in the admin dashboard.

### Fixed Navigation Header
- Header remains visible at the top while scrolling
- Quick access to navigation buttons
- Easy switching between Customer Portal and Admin Dashboard
- Works seamlessly on all devices

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

## ⚙️ Configuration

### MongoDB Connection
- **Default URI:** `mongodb://localhost:27017/worksetu`
- **Update Location:** Edit `MONGODB_URI` constant in `server.js`
- **Supported:** Local MongoDB and MongoDB Atlas
- **Port:** Default MongoDB runs on port 27017

### Issue ID Generation
- Sequential user-friendly IDs: ISU001, ISU002, ISU003, etc.
- Backend uses MongoDB ObjectId for database operations
- Frontend displays user-friendly ID for customer reference
- IDs persist across server restarts

### Environment Setup
- **Node Version:** v14+
- **Package Manager:** npm
- **Server Port:** 3001
- **Auto-reload:** Install nodemon for development (`npm install -g nodemon`)

## 🔒 Data & Constraints

✅ MongoDB database for persistent storage  
✅ Sequential issue IDs (ISU001, ISU002, etc.)  
✅ No frontend frameworks (Vanilla JavaScript ES6+)  
✅ RESTful API design  
✅ CORS enabled for development  
✅ Fixed navigation header for constant access  
✅ Dual view modes (Cards + Table)  

⚠️ **Important Notes:**
- MongoDB server must be running for the app to function
- Data persists across server restarts (stored in database)
- Delete operations are permanent
- All timestamps are in ISO 8601 format

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
| Data Storage | In-memory | MongoDB (persistent) |
| UI Views | Cards only | Cards + Table |
| Header | Scrollable | Fixed navigation |
| Issue IDs | Auto-generated numbers | Sequential (ISU001, ISU002) |

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as a specialized ecommerce solution based on the complaint tracker system. Now featuring MongoDB integration, dual view modes, and fixed navigation for enhanced user experience.

## 🙏 Acknowledgments

- Designed for ecommerce businesses and online retailers
- Built following RESTful API best practices with Mongoose and Express.js
- Optimized for customer service workflows
- MongoDB integration for enterprise-grade data persistence
- Responsive design principles for all device sizes

## 📚 Tech Stack Summary

**Backend:**
- Express.js - REST API server
- MongoDB - Database for persistence
- Mongoose - ODM for MongoDB
- Node.js - JavaScript runtime

**Frontend:**
- HTML5 - Semantic markup
- CSS3 - Modern styling with responsive design
- Vanilla JavaScript ES6+ - No framework overhead
- Fetch API - HTTP communication

---

**Server Port:** 3001  
**Database:** MongoDB (worksetu)  
**Theme:** Red gradient with modern glassmorphism  
**Focus:** Order and product issue management  
**Updated:** February 2026
