const express = require("express");
const router = express.Router();

const controller = require("../controllers/financeController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /finance:
 *   post:
 *     summary: Create record
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
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
 *         description: Record fetched
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