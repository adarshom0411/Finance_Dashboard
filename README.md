# 💰 Finance Dashboard Backend System

A backend system designed for managing financial records with role-based access control and dashboard-level analytics.

> ⚡ This project was built as a backend-focused assignment.
> A minimal frontend was additionally implemented to demonstrate API integration and usability.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure login system
* Role-Based Access Control (RBAC)

Supported roles:

* **Admin** → Full access (users + records)
* **Analyst** → View records and access analytics
* **Viewer** → Read-only access


---

### 👤 User Management

* Create and manage users
* Assign and update roles
* Role-based restrictions enforced at API level

---

### 💰 Financial Records Management

* Create, read, update, delete financial records
* Fields:

  * Amount
  * Type (Income / Expense)
  * Category
  * Date
  * Notes
* Filtering support:

  * By type
  * By category
  * By date range

---

### 📊 Dashboard APIs

* Total Income
* Total Expenses
* Net Balance
* Category-wise aggregation
* Recent transactions

---

### 🛡️ Validation & Error Handling

* Input validation (basic)
* Proper HTTP status codes
* Structured error responses

---

## 🧠 Tech Stack

### Backend (Primary Focus)

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Frontend (Optional Enhancement)

* React.js
* Axios
* Tailwind CSS

---

## 📁 Backend Project Structure

```
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── config/
├── utils/
└── server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd finance-dashboard
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/finance_dashboard
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
SEED_ADMIN_ON_START=true
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=Admin@123
```

Run server:

```bash
npm run dev
```

---

## 🔑 Default Admin Credentials

```
Email: admin@example.com
Password: Admin@123
```

---

## 📡 API Endpoints

### Auth

```
POST /api/auth/register
POST /api/auth/login
```

### Users

```
GET /api/users
PUT /api/users/:id
```

### Finance

```
POST /api/finance
GET /api/finance
PUT /api/finance/:id
DELETE /api/finance/:id
```

### Dashboard

```
GET /api/dashboard/summary
GET /api/dashboard/categories
GET /api/dashboard/recent
```

---

## 🧪 Testing

* Tested using Postman
* Verified:

  * Authentication flow
  * RBAC enforcement
  * CRUD operations
  * Dashboard aggregation APIs

---

## ⚠️ Assumptions

* Single-user environment (no multi-tenancy)
* Basic validation implemented
* Seeder creates default admin user

---

## 🚀 Optional Frontend (Added Enhancement)

A simple React-based UI was added to:

* Demonstrate API usage
* Improve usability
* Visualize dashboard data

> Note: Frontend is not part of the original assignment requirements.

---

## 🚀 Future Improvements

* Pagination & search
* Advanced validation (Joi/Zod)
* API documentation (Swagger)
* Refresh token system
* Performance optimization (aggregation pipelines)

---

## 🌐 Live Demo

Frontend: https://finance-dashboard-mu-mauve.vercel.app  
Backend API: https://finance-backend-s248.onrender.com/api

### Demo Credentials
Email: admin@example.com  
Password: Admin@123

---

## 👨‍💻 Author

Adarsh Singh
Mechanical Engineer → MERN Stack Developer

---

## 📌 Summary

This project demonstrates:

* Backend architecture design
* Role-based access control
* Financial data modeling
* Aggregation-based APIs

It is structured to reflect real-world backend development practices.
