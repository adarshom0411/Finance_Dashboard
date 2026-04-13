const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Fetch all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "661f1c2a9c1234567890abcd"
 *                   name: "Adarsh"
 *                   email: "adarsh@gmail.com"
 *                   role: "admin"
 *       403:
 *         description: Forbidden (Admin only)
 */
router.get("/", protect, authorize("admin"), controller.getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user
 *     description: Create a new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "User1"
 *             email: "user1@example.com"
 *             password: "Admin@123"
 *             role: "analyst"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "661f1c2a9c1234567890abcd"
 *                 name: "User1"
 *                 email: "user1@example.com"
 *                 role: "analyst"
 */
router.post("/", protect, authorize("admin"), controller.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     description: Update user details (Admin only)
 *     tags: [Users]
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
 *             name: "Updated User"
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/:id", protect, authorize("admin"), controller.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Permanently delete a user (Admin only)
 *     tags: [Users]
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
 *         description: User deleted successfully
 */
router.delete("/:id", protect, authorize("admin"), controller.deleteUser);

/**
 * @swagger
 * /users/{id}/deactivate:
 *   patch:
 *     summary: Deactivate user
 *     description: Mark user as inactive (Admin only)
 *     tags: [Users]
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
 *         description: User deactivated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User deactivated successfully"
 */
router.patch("/:id/deactivate", protect, authorize("admin"), controller.deactivateUser);

module.exports = router;