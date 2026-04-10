const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const financeRoutes = require("./financeRoutes");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/finance", financeRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;