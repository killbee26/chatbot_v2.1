const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create the Event model from the schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
