const express = require('express');
const router = express.Router();
const noteRouter = require('./noteRoutes')

const {getTickets, createTicket, getTicket, deleteTicket, updateTicket} = require('../controllers/ticketController');

const {protect} = require('../middleware/authMiddleware');



// router.route('/').get(protect, getTickets); // Same as bellow
router.get('/', protect, getTickets);// get all tickets
router.post('/', protect, createTicket) // Create
router.get('/:ticketId',protect, getTicket); // Read
router.put('/:ticketId',protect, updateTicket); // Update
router.delete('/:ticketId', protect, deleteTicket); // Delete

// Re-route into note
router.use('/:ticketId/notes', noteRouter) // tickets/:ticketId/notes



module.exports = router;