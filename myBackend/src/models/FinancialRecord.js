const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard API",
      version: "1.0.0",
      description: "API documentation for Finance Dashboard backend"
    },
    servers: [
      {
        url: "https://finance-backend-s248.onrender.com/api"
      }
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
                    $ref: "#/components/schemas/FinancialRecord" // ✅ FIXED
                  }
                }
              }
            }
          }
        },

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
              example: "salary"
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2026-04-10T00:00:00.000Z"
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

        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "661f1c2a9c1234567890abcd"
            },
            name: {
              type: "string",
              example: "Adarsh Singh"
            },
            email: {
              type: "string",
              example: "adarsh@gmail.com"
            },
            role: {
              type: "string",
              enum: ["viewer", "analyst", "admin"],
              example: "admin"
            },
            isActive: {
              type: "boolean",
              example: true
            }
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