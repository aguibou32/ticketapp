const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/NoteModel')
const Ticket = require('../models/TicketModel')



//  GET notes for a ticket
//  GET /api/tickets/:ticketId/notes
const getNotes = asyncHandler(async(req, res) => {

  const user = await User.findById(req.user.id); // This is only working because when the user logs in, we are setting the req.user to the user

  if(!user){
    res.status(401);
    throw new Error('User not found');
  }
 
  const ticket = await Ticket.findById(req.params.ticketId); // find the ticket of the user
  
  
  if (ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized ')
  }

  const notes = await Note.find({ticket: req.params.ticketId})
  res.status(200).json(notes)
});


const createNote = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user.id); // This is only working because when the user logs in, we are setting the req.user to the user

  if(!user){
    res.status(401);
    throw new Error('User not found');
  }
 
  const ticket = await Ticket.findById(req.params.ticketId); // find the ticket of the user
  
  
  if (ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized ')
  }


  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error('Please add some text');
  }

  // Create and return the note
  const note = await Note.create({
    user: req.user.id,
    ticket: req.params.ticketId,
    text: text,
  });

  res.status(201).json(note);
});

module.exports = createNote;



module.exports = {
  getNotes,
  createNote
}