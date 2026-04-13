const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard API",
      version: "1.0.0",
      description: "🚀 API documentation for Finance Dashboard backend with Auth, Records & Analytics"
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
                    $ref: "#/components/schemas/FinancialRecord" // ✅ ADDED
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