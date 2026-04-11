const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.use("/api", routes);

// =======================================================
// ✅ MOVE SWAGGER HERE (BEFORE notFound)
// =======================================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ❌ this should be AFTER swagger
app.use(notFound);

app.use(errorHandler);

console.log("Routes mounted at /api");

module.exports = app;