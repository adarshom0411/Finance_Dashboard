const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard API",
      version: "1.0.0",

      // ✅ UPDATED (PORTFOLIO-LEVEL DESCRIPTION ONLY)
      description: `
🚀 **Finance Dashboard Backend API**

A production-ready backend system built with Node.js, Express, and MongoDB, featuring authentication, role-based access control, financial record management, and analytics.

---

### 👨‍💻 Developer
**Adarsh Singh**

🔗 GitHub: https://github.com/YOUR_GITHUB_USERNAME

---

### 🧩 Features
- 🔐 JWT Authentication
- 🛡️ Role-Based Access Control (RBAC)
- 💰 Financial Records CRUD
- 📊 Dashboard Analytics (Summary, Trends, Categories)
- 📄 Pagination, Filtering & Sorting
- ⚡ Secure API with Rate Limiting & Helmet

---

### 🚀 Quick Start Guide

1️⃣ Register/Login  
2️⃣ Copy JWT Token  
3️⃣ Click 🔒 Authorize  
4️⃣ Paste:
\`\`\`
Bearer YOUR_TOKEN
\`\`\`
5️⃣ Start using APIs  

---

### 📌 Example Flow

👉 Login:
\`\`\`json
POST /auth/login
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
\`\`\`

👉 Use Token:
\`\`\`
Authorization: Bearer YOUR_TOKEN
\`\`\`

👉 Create Record:
\`\`\`json
POST /records
{
  "amount": 5000,
  "type": "income",
  "category": "Salary",
  "date": "2026-04-13"
}
\`\`\`

---

### 🏷️ API Capabilities
- ✅ Authentication
- ✅ RBAC Authorization
- ✅ CRUD Operations
- ✅ Analytics Dashboard
- ✅ Production Ready

---
`
    },

    // ✅ ADDED (clean server description)
    servers: [
      {
        url: "https://finance-backend-s248.onrender.com/api",
        description: "Production Server"
      }
    ],

    // ✅ ADDED (professional grouping)
    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Records", description: "Financial Records APIs" },
      { name: "Dashboard", description: "Analytics APIs" }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            data: {
              type: "object",
              example: {}
            }
          }
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false
            },
            message: {
              type: "string",
              example: "Something went wrong"
            }
          }
        },

        // ✅ ADDED (specific financial record schema)
        FinancialRecord: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "661f1c2a9c1234567890abcd"
            },
            amount: {
              type: "number",
              example: 5000
            },
            type: {
              type: "string",
              enum: ["income", "expense"],
              example: "income"
            },
            category: {
              type: "string",
              example: "Salary"
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2026-04-13T00:00:00.000Z"
            },
            note: {
              type: "string",
              example: "Monthly salary"
            },
            createdBy: {
              type: "string",
              example: "661f1c2a9c1234567890abcd"
            },
            updatedBy: {
              type: "string",
              example: "661f1c2a9c1234567890abcd"
            },
            isDeleted: {
              type: "boolean",
              example: false
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        },

        // ✅ UPDATED (linked to FinancialRecord)
        PaginatedResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            data: {
              type: "object",
              properties: {
                page: {
                  type: "number",
                  example: 1
                },
                limit: {
                  type: "number",
                  example: 10
                },
                total: {
                  type: "number",
                  example: 50
                },
                totalPages: {
                  type: "number",
                  example: 5
                },
                records: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/FinancialRecord"
                  }
                }
              }
            }
          }
        },

        // ✅ ADDED (dashboard schemas)
        SummaryResponse: {
          type: "object",
          properties: {
            totalIncome: { type: "number", example: 5000 },
            totalExpense: { type: "number", example: 2000 },
            netBalance: { type: "number", example: 3000 }
          }
        },

        CategoryResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "Food" },
            totalIncome: { type: "number", example: 0 },
            totalExpense: { type: "number", example: 2000 }
          }
        },

        TrendResponse: {
          type: "object",
          properties: {
            _id: {
              type: "object",
              properties: {
                year: { type: "number", example: 2026 },
                month: { type: "number", example: 4 }
              }
            },
            totalIncome: { type: "number", example: 5000 },
            totalExpense: { type: "number", example: 2000 }
          }
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJsDoc(options);