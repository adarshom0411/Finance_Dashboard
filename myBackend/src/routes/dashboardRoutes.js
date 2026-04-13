const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard analytics APIs
 */

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get financial summary (income, expense, balance)
 *     description: Returns total income, total expense and net balance for the logged-in user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 totalIncome: 10000
 *                 totalExpense: 4000
 *                 netBalance: 6000
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/summary", protect, dashboardController.getSummary);

/**
 * @swagger
 * /dashboard/categories:
 *   get:
 *     summary: Get category-wise income and expense breakdown
 *     description: Groups records by category and calculates total income and expense
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "Food"
 *                   totalIncome: 0
 *                   totalExpense: 1500
 *                 - _id: "Salary"
 *                   totalIncome: 10000
 *                   totalExpense: 0
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/categories", protect, dashboardController.getCategories);

/**
 * @swagger
 * /dashboard/recent:
 *   get:
 *     summary: Get recent financial transactions
 *     description: Returns latest 5 financial records sorted by creation date
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent transactions fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "661f1c2a9c1234567890abcd"
 *                   amount: 500
 *                   type: "expense"
 *                   category: "Food"
 *                   date: "2026-04-13T00:00:00.000Z"
 *                   note: "Lunch"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/recent", protect, dashboardController.getRecent);

/**
 * @swagger
 * /dashboard/trends:
 *   get:
 *     summary: Get monthly income and expense trends
 *     description: Aggregates records by month and year to show financial trends over time
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trends data fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id:
 *                     year: 2026
 *                     month: 4
 *                   totalIncome: 10000
 *                   totalExpense: 5000
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/trends", protect, dashboardController.getMonthlyTrends);

module.exports = router;