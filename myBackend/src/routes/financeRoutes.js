const express = require("express");
const router = express.Router();

const controller = require("../controllers/financeController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /finance:
 *   post:
 *     summary: Create financial record
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", protect, controller.createRecord);

/**
 * @swagger
 * /finance:
 *   get:
 *     summary: Get all financial records
 *     tags: [Finance]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 */
router.get("/", protect, controller.getRecords);

/**
 * @swagger
 * /finance/{id}:
 *   get:
 *     summary: Get record by ID
 *     tags: [Finance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", protect, controller.getRecordById);

/**
 * @swagger
 * /finance/{id}:
 *   put:
 *     summary: Update record
 *     tags: [Finance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", protect, controller.updateRecord);

/**
 * @swagger
 * /finance/{id}:
 *   delete:
 *     summary: Delete record
 *     tags: [Finance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", protect, controller.deleteRecord);

module.exports = router;