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
                    type: "object"
                  }
                }
              }
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