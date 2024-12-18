const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');
const { body } = require('express-validator');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: [customer, support agent, admin]
 *                 example: "customer"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request - Validation failed or user already exists
 */
router.post('/register', 
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginUser);

module.exports = router;
