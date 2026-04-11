# 💰 Finance Dashboard Backend System

A scalable backend system for managing financial records with **role-based access control (RBAC)** and **dashboard-level analytics**.

> ⚡ Built as part of a backend-focused assignment to demonstrate API design, business logic, and access control.
> A minimal frontend was added to showcase real-world integration.

---

# 🚀 Features

## 🔐 Authentication & Authorization

* JWT-based authentication
* Secure login system
* Role-Based Access Control (RBAC)

### 👥 Roles & Permissions

| Role        | Access                            |
| ----------- | --------------------------------- |
| **Admin**   | Full access (users + records)     |
| **Analyst** | Read records + dashboard insights |
| **Viewer**  | Read-only access                  |

---

## 👤 User Management

* Create, update, and delete users
* Assign roles dynamically
* Deactivate users (soft control)
* Role-based restrictions enforced at API level

---

## 💰 Financial Records Management

* Full CRUD operations
* Soft delete support
* Pagination & filtering
* Search support

### 📌 Fields

* Amount
* Type (Income / Expense)
* Category
* Date
* Note

### 🔎 Filtering & Search

* Filter by type, category, date
* Keyword search (category + note)
* Pagination (`page`, `limit`)

---

## 📊 Dashboard APIs

* Total Income
* Total Expenses
* Net Balance
* Category-wise aggregation
* Recent transactions
* Monthly trends

---

## 🛡️ Validation & Error Handling

* Input validation using middleware
* Proper HTTP status codes
* Centralized error handling
* Protection against invalid operations

---

## ⚡ Performance & Security

* Rate limiting (`express-rate-limit`)
* Secure headers (`helmet`)
* CORS enabled
* Token-based protected routes

---

## 📘 API Documentation

* Swagger UI available at:

  ```
  http://localhost:4000/api-docs
  ```
* Postman documentation also included for public sharing

---

# 🧠 Tech Stack

## Backend (Primary Focus)

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

## Frontend (Optional Enhancement)

* React.js
* Axios
* Tailwind CSS

---

# 📁 Backend Project Structure

```
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── validators/
├── config/
├── utils/
└── server.js
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/adarshom0411/Finance_Dashboard.git
cd Finance_Dashboard
```

---

## 2️⃣ Backend Setup

```bash
cd myBackend
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

---

## ▶️ Run Server

```bash
npm run dev
```

---

# 🔑 Default Admin Credentials

```
Email: admin@example.com
Password: Admin@123
```

---

# 📡 API Endpoints

## 🔐 Auth

```
POST /api/auth/register
POST /api/auth/login
```

---

## 👤 Users (Admin Only)

```
GET /api/users
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
PATCH /api/users/:id/deactivate
```

---

## 💰 Finance

```
POST /api/finance
GET /api/finance
GET /api/finance/:id
PUT /api/finance/:id
DELETE /api/finance/:id
```

---

## 📊 Dashboard

```
GET /api/dashboard/summary
GET /api/dashboard/categories
GET /api/dashboard/recent
GET /api/dashboard/trends
```

---

# 🧪 Testing

* Tested using Postman
* Verified:

  * Authentication flow
  * RBAC enforcement
  * CRUD operations
  * Dashboard aggregation APIs

---

# ⚠️ Assumptions

* Single-user environment (no multi-tenancy)
* Local MongoDB used for development
* Seeder creates default admin user
* Soft delete used instead of permanent deletion

---

# 🚀 Optional Frontend

A simple React-based UI was added to:

* Demonstrate API usage
* Visualize dashboard data
* Improve usability

> Note: Frontend is not part of core assignment requirements.

---

# 🚀 Future Improvements

* Advanced validation (Joi/Zod)
* Refresh token system
* Unit & integration testing
* Query optimization (aggregation pipelines)
* Role-based UI enhancements

---

# 🔗 Links

* 🌐 Live App: https://finance-dashboard-mu-mauve.vercel.app
* ⚙ Backend API: https://finance-backend-s248.onrender.com
* 💻 GitHub Repo: https://github.com/adarshom0411/Finance_Dashboard

---

# 👨‍💻 Author

**Adarsh Singh**
Mechanical Engineer → MERN Stack Developer

---

# 📌 Summary

This project demonstrates:

* Scalable backend architecture
* Role-based access control (RBAC)
* Financial data modeling
* Aggregation-based APIs
* Real-world API design principles

👉 Designed to reflect production-level backend development practices.