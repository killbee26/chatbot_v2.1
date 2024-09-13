// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  adults: { 
    type: String, 
    required: true 
  },
  children: {
     type: String, 
     required: true 
    },
  date: { 
    type: Date, 
    required: true 
  },
  timeSlot: { 
    type: String, required: true 
  },
  exhibition: {
     type: String, required: true 
    },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
