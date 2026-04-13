const express = require("express");

const {
  createRecord,
  deleteRecord,
  getRecordById,
  listRecords,
  updateRecord
} = require("../controllers/recordController");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const validate = require("../middlewares/validate");
const {
  createRecordValidation,
  listRecordsValidation,
  recordIdValidation,
  updateRecordValidation
} = require("../validators/recordValidators");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

router.use(protect);

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all records (with filters, pagination, sorting)
 *     description: Fetch paginated financial records with optional filters like type, category, date range and keyword search
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Number of records per page
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search in category or notes
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Filter by record type
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter from date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter till date
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., amount, -date)
 *     responses:
 *       200:
 *         description: Records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
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
router.get("/", authorize("records:read"), validate(listRecordsValidation), listRecords);

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     summary: Get record by ID
 *     description: Fetch a single financial record using its ID
 *     tags: [Records]
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
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 record:
 *                   _id: "661f1c2a9c1234567890abcd"
 *                   amount: 500
 *                   type: "expense"
 *                   category: "Food"
 *                   date: "2026-04-13T00:00:00.000Z"
 *                   note: "Lunch"
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", authorize("records:read"), validate(recordIdValidation), getRecordById);

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a new record
 *     description: Add a new financial record (income or expense)
 *     tags: [Records]
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
 *             date: "2026-04-13"
 *             note: "Monthly salary"
 *     responses:
 *       201:
 *         description: Record created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 record:
 *                   _id: "661f1c2a9c1234567890abcd"
 *                   amount: 5000
 *                   type: "income"
 *                   category: "Salary"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", authorize("records:write"), validate(createRecordValidation), createRecord);

/**
 * @swagger
 * /records/{id}:
 *   patch:
 *     summary: Update record
 *     description: Update fields of an existing financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             amount: 500
 *             category: "Food"
 *     responses:
 *       200:
 *         description: Record updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Financial record updated successfully."
 *       404:
 *         description: Record not found
 */
router.patch("/:id", authorize("records:write"), validate(updateRecordValidation), updateRecord);

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     summary: Delete record (soft delete)
 *     description: Marks a record as deleted without removing it from database
 *     tags: [Records]
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
 *         description: Record deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Financial record soft deleted successfully."
 */
router.delete("/:id", authorize("records:write"), validate(recordIdValidation), deleteRecord);

module.exports = router;