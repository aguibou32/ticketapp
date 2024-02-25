const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');


const protect = asyncHandler(async (req, res, next) => { 

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // We are decoding the token, like when you copy and paste in that website and it decodes it

      // console.log(decoded); // Just to make sure we are getting something when we decode the token
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password'); // We getting the user 
      //by the id by using the model, and we setting  to the req.user, that way we can access throughout application. It will take all the fields and exclude the password field

      // console.log(req.user); // Just to make sure we are getting something
      next();

    } catch (error){
      console.log(error);
      res.status(401);

      throw new Error('Not authorized ')
    }
  }

  if(!token){
    res.status(401);
    throw new Error('Not authorized')
  }
});

module.exports = {protect}