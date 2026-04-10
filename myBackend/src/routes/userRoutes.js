const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, controller.getUsers);
router.post("/", protect, controller.createUser);
router.put("/:id", protect, controller.updateUser);
router.delete("/:id", protect, controller.deleteUser);

module.exports = router;