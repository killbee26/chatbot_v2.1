const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  adults: { 
    type: Number,  // Change to Number to match your data
    required: true 
  },
  children: {
    type: Number,  // Change to Number to match your data
    required: true
  },
  date: { 
    type: String, 
    required: true 
  },
  timeSlot: { 
    type: String, 
    required: true 
  },
  event: {
    type: String,  // Change to Boolean to match your data
    required: false
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
