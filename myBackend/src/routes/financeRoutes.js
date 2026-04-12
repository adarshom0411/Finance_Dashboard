const express = require("express");
const router = express.Router();

const controller = require("../controllers/financeController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Finance
 *   description: Financial records management APIs
 */

/**
 * @swagger
 * /finance:
 *   post:
 *     summary: Create financial record
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 5000
 *             type: "income"
 *             category: "Salary"
 *             date: "2026-04-12"
 *             note: "Monthly salary"
 *     responses:
 *       201:
 *         description: Record created
 */
router.post("/", protect, controller.createRecord);

/**
 * @swagger
 * /finance:
 *   get:
 *     summary: Get all records
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Records fetched
 */
router.get("/", protect, controller.getRecords);

/**
 * @swagger
 * /finance/{id}:
 *   get:
 *     summary: Get record by ID
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record fetched successfully
 */
router.get("/:id", protect, controller.getRecordById);

/**
 * @swagger
 * /finance/{id}:
 *   put:
 *     summary: Update record
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 3000
 *             type: "expense"
 *             category: "Food"
 *             date: "2026-04-12"
 *             note: "Dinner"
 *     responses:
 *       200:
 *         description: Record updated
 */
router.put("/:id", protect, controller.updateRecord);

/**
 * @swagger
 * /finance/{id}:
 *   delete:
 *     summary: Delete record
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted
 */
router.delete("/:id", protect, controller.deleteRecord);

module.exports = router;