const express = require("express");
const router = express.Router();

const controller = require("../controllers/financeController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /finance:
 *   post:
 *     summary: Create a financial record
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - category
 *               - type
 *               - amount
 *             properties:
 *               date:
 *                 type: string
 *                 example: 2026-04-12
 *               category:
 *                 type: string
 *                 example: Food
 *               type:
 *                 type: string
 *                 example: expense
 *               amount:
 *                 type: number
 *                 example: 500
 *               note:
 *                 type: string
 *                 example: Lunch
 *     responses:
 *       201:
 *         description: Record created successfully
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
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 10
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
 *         description: Records fetched successfully
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
 *         example: 69db8a9c295cfa2cc2aecc18
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