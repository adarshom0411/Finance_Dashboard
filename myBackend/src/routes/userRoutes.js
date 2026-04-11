const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// =======================================================
// ✅ ADDED: Role Middleware
// =======================================================
const { authorize } = require("../middlewares/roleMiddleware");


// =======================================================
// ✅ MODIFIED: Admin-only access
// =======================================================
router.get("/", protect, authorize("admin"), controller.getUsers);
router.post("/", protect, authorize("admin"), controller.createUser);
router.put("/:id", protect, authorize("admin"), controller.updateUser);
router.delete("/:id", protect, authorize("admin"), controller.deleteUser);

router.patch("/:id/deactivate", protect, authorize("admin"), controller.deactivateUser);

module.exports = router;