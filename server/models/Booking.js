// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  exhibition: { type: String, required: true },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
