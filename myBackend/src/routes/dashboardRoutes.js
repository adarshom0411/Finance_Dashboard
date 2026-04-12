const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get financial summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary fetched successfully
 */
router.get("/summary", protect, dashboardController.getSummary);

/**
 * @swagger
 * /dashboard/categories:
 *   get:
 *     summary: Get category breakdown
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched
 */
router.get("/categories", protect, dashboardController.getCategories);

/**
 * @swagger
 * /dashboard/recent:
 *   get:
 *     summary: Get recent transactions
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent transactions
 */
router.get("/recent", protect, dashboardController.getRecent);

/**
 * @swagger
 * /dashboard/trends:
 *   get:
 *     summary: Get monthly trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trends data
 */
router.get("/trends", protect, dashboardController.getMonthlyTrends);

module.exports = router;