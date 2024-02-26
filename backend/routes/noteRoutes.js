const express = require('express')
const router = express.Router({mergeParams: true})

const {getNotes} = require('../controllers/noteController')
const {createNote} = require('../controllers/noteController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getNotes)
router.post('/', protect, createNote)
module.exports = router

//  /api/tickets/:ticketId/notespo