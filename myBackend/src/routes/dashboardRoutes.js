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
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalIncome:
 *                       type: number
 *                       example: 10000
 *                     totalExpense:
 *                       type: number
 *                       example: 4000
 *                     netBalance:
 *                       type: number
 *                       example: 6000
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/summary", protect, dashboardController.getSummary);

/**
 * @swagger
 * /dashboard/categories:
 *   get:
 *     summary: Get category-wise income and expense breakdown
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: food
 *                       totalIncome:
 *                         type: number
 *                         example: 2000
 *                       totalExpense:
 *                         type: number
 *                         example: 1500
 */
router.get("/categories", protect, dashboardController.getCategories);

/**
 * @swagger
 * /dashboard/recent:
 *   get:
 *     summary: Get recent financial transactions
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FinancialRecord'
 */
router.get("/recent", protect, dashboardController.getRecent);

/**
 * @swagger
 * /dashboard/trends:
 *   get:
 *     summary: Get monthly income and expense trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trends data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: object
 *                         properties:
 *                           year:
 *                             type: number
 *                             example: 2026
 *                           month:
 *                             type: number
 *                             example: 4
 *                       totalIncome:
 *                         type: number
 *                         example: 10000
 *                       totalExpense:
 *                         type: number
 *                         example: 5000
 */
router.get("/trends", protect, dashboardController.getMonthlyTrends);

module.exports = router;