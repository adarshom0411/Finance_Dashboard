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

router.get("/", authorize("records:read"), validate(listRecordsValidation), listRecords);
router.get("/:id", authorize("records:read"), validate(recordIdValidation), getRecordById);
router.post("/", authorize("records:write"), validate(createRecordValidation), createRecord);
router.patch("/:id", authorize("records:write"), validate(updateRecordValidation), updateRecord);
router.delete("/:id", authorize("records:write"), validate(recordIdValidation), deleteRecord);

module.exports = router;
