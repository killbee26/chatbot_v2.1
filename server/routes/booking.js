// routes/booking.js
const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// POST route to create a new booking
router.post("/create", async (req, res) => {
  try {
    const { adults, children, date, timeSlot, exhibition } = req.body;

    // Create new booking
    const newBooking = new Booking({
      adults,
      children,
      date,
      timeSlot,
      exhibition,
    });

    // Save the booking to MongoDB
    await newBooking.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking", error });
  }
});

module.exports = router;
