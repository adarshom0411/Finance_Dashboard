const express = require("express");
const router = express.Router();

const controller = require("../controllers/financeController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, controller.createRecord);

router.get("/", protect, controller.getRecords);

router.put("/:id", protect, controller.updateRecord);

router.delete("/:id", protect, controller.deleteRecord);

module.exports = router;