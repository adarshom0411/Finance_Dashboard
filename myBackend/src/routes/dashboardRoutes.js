const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/summary", protect, dashboardController.getSummary);
router.get("/categories", protect, dashboardController.getCategories);
router.get("/recent", protect, dashboardController.getRecent); 

router.get("/trends", protect, dashboardController.getMonthlyTrends);

module.exports = router;