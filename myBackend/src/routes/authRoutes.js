const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with name, email, and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "661f1c2a9c1234567890abcd"
 *                 name: "Admin"
 *                 email: "admin@example.com"
 *                 role: "admin"
 *       400:
 *         description: Bad request / user already exists
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/register", controller.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     description: Authenticate user and return JWT token for authorized requests
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful (returns JWT token)
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   id: "661f1c2a9c1234567890abcd"
 *                   name: "Admin"
 *                   email: "admin@example.com"
 *                   role: "admin"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", controller.login);

module.exports = router;