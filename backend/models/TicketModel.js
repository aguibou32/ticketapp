const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
    {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad', 'iPod', 'Apple Watch'],
      // just remember on the interface and postman, the values have to match your enums
      
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the issue'],
    },
    status: {
      type: String,
      enum:['new', 'open', 'closed'],
      // just remember on the interface and postman, the values have to match your enums
      default: 'new'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Ticket', ticketSchema);