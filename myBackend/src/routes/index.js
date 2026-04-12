const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const financeRoutes = require("./financeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const recordRoutes = require("./recordRoutes"); // ✅ ADD THIS

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/finance", financeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/records", recordRoutes); // ✅ ADD THIS

module.exports = router;