const express = require("express");
const router = express.Router();

const controller = require("../controllers/financeController");
const { protect } = require("../middlewares/authMiddleware");

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
 *         name: type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Records fetched
 */
router.get("/", protect, controller.getRecords);

module.exports = router;