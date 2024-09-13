// routes/booking.js
const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// POST route to create a new booking
router.post("/create", async (req, res) => {
  
    const { adults, children, date, timeSlot, exhibition } = req.body;

   
  try {
    const newBooking = await Booking.create(req.body);
    console.log(newBooking)
    res.status(201).json(newBooking);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }


});

module.exports = router;
