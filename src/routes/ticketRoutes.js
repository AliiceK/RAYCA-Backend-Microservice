const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const {
    createTicket,
    getTickets,
    updateTicket,
    deleteTicket
} = require('../controllers/ticketController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: API for managing customer support tickets
 */


/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new support ticket
 *     tags: [Tickets]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Login issue"
 *               description:
 *                 type: string
 *                 example: "Unable to login to my account."
 *               assignedTo:
 *                 type: string
 *                 example: "60c72b2f4f1a5c3d6c8e4f00"
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Bad request - Missing required fields
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */
router.post('/', protect, createTicket);          

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Retrieve all tickets (Admin Only)
 *     tags: [Tickets]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of tickets
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Admin access only
 */

router.get('/', protect, admin, getTickets);    

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Update a specific ticket
 *     tags: [Tickets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the ticket to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [open, in-progress, closed]
 *                 example: "in-progress"
 *               assignedTo:
 *                 type: string
 *                 example: "60c72b2f4f1a5c3d6c8e4f00"
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Ticket not found
 */
router.put('/:id', protect, updateTicket);   


/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Delete a specific ticket (Admin Only)
 *     tags: [Tickets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the ticket to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 *       403:
 *         description: Forbidden - Admin access only
 */
router.delete('/:id', protect, admin, deleteTicket); 

module.exports = router;
