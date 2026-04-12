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

router.use(authenticate);

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all records (with filters)
 *     tags: [Records]
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
 *         description: Records fetched successfully
 */
router.get("/", authorize("records:read"), validate(listRecordsValidation), listRecords);

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     summary: Get record by ID
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
 *         description: Record fetched
 */
router.get("/:id", authorize("records:read"), validate(recordIdValidation), getRecordById);

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a new record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 1000
 *             type: "income"
 *             category: "Salary"
 *             date: "2026-04-12"
 *             note: "Freelance work"
 *     responses:
 *       201:
 *         description: Record created successfully
 */
router.post("/", authorize("records:write"), validate(createRecordValidation), createRecord);

/**
 * @swagger
 * /records/{id}:
 *   patch:
 *     summary: Update record
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
 *         description: Record updated
 */
router.patch("/:id", authorize("records:write"), validate(updateRecordValidation), updateRecord);

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     summary: Delete record
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
 *         description: Record deleted
 */
router.delete("/:id", authorize("records:write"), validate(recordIdValidation), deleteRecord);

module.exports = router;