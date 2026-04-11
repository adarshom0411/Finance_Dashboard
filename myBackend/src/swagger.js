const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard API",
      version: "1.0.0",
      description: "API documentation for Finance Dashboard backend"
    }
  },
  apis: ["./routes/*.js"] 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;