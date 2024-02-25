const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Ticket = require('../models/TicketModel');

// Get user tickets
const getTickets = asyncHandler(async(req, res) => {

  const user = await User.findById(req.user.id); // This is only working because when the user logs in, we are setting the req.user to the user

  if(!user){
    res.status(401);
    throw new Error('User not found');
  }
 
  const tickets = await Ticket.find({user: req.user.id}); // find the ticket of the user
  res.status(200).json(tickets);
});

const createTicket = asyncHandler(async(req, res) => {

  const {product , description} = req.body;

  if(!product || !description){
    res.status(400);
    throw new Error('Please add a product and a description');
  }

  const user = await User.findById(req.user.id); // This is only working because when the user logs in, we are setting the req.user to the user

  if(!user){
    res.status(401);
    throw new Error('User not found');
  }
 
    const ticket = await Ticket.create({
    product, 
    description,
    user: req.user.id,
    status: 'new'
  })

  res.status(201).json(ticket);
})


const getTicket = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401);
    throw new Error('User not found');
  }

  const ticketId = req.params.ticketId;
  const ticket = await Ticket.findById(ticketId);

  if(!ticket){
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Making sure, the user that is logged in is the one that owns the ticket we fetching
  if(ticket.user.toString() !== req.user.id){
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json(ticket);

})


const updateTicket = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401);
    throw new Error('User not found');
  }

  const ticketId = req.params.ticketId;
  const ticket = await Ticket.findById(ticketId);

  if(!ticket){
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Making sure, the user that is logged in is the one that owns the ticket we fetching
  if(ticket.user.toString() !== req.user.id){
    res.status(401);
    throw new Error('Not Authorized');
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, {new: true}); // {new: true} here makes sure the updatedTicket contains the unpdated information not the old version. Ask your friend in case you dont remember.
  res.status(200).json(updatedTicket);
});


const deleteTicket = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401);
    throw new Error('User not found');
  }

  const ticketId = req.params.ticketId;
  const ticket = await Ticket.findById(ticketId);

  // console.log(ticket);

  if(!ticket){
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Making sure, the user that is logged in is the one that owns the ticket we fetching
  if(ticket.user.toString() !== req.user.id){ // user is the field that has the user id on the tickets table
    res.status(401);
    throw new Error('Not Authorized');
  }
  // await ticket.remove();
  await Ticket.deleteOne({_id: ticketId});

  res.status(200).json({success: true});

});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket
}