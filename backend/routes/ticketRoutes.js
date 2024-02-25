const express = require('express');
const router = express.Router();

const {getTickets, createTicket, getTicket, deleteTicket, updateTicket} = require('../controllers/TicketController');

const {protect} = require('../middleware/authMiddleware');

// router.route('/').get(protect, getTickets); // Same as bellow
router.get('/', protect, getTickets);
router.post('/', protect, createTicket) // Create 
router.get('/:ticketId',protect, getTicket); // Read
router.put('/:ticketId',protect, updateTicket); // Update
router.delete('/:ticketId', protect, deleteTicket); // Delete


module.exports = router;