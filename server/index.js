const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const User = require('./models/User')
const bodyParser = require("body-parser");
const Event = require('./models/Event')
const Booking = require('./models/Booking')

const app = express()
app.use(express.json())
app.use(cors())
const uri = "mongodb://localhost:27017/chatbot_v1";
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});







//register api
app.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user)
    res.status(201).json(user);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
});

//Login controller
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await User.findOne({ email });
    
    // If user doesn't exist
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check if password is correct
    if(password !== user.password){
      return res.status(401).json({ message: 'Invalid email or password' });
    }// If everything is correct, send success response
    else{
      return res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
    }
   
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
    console.log(err)
  }
});

// Endpoint to fetch events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Optional: Endpoint to create a new event (for testing purposes)
app.post('/events', async (req, res) => {




  const { imageUrl, name, venue, date, timeSlot, description } = req.body;
  //hi
  // const newEvent = new Event({
  //   imageUrl,
  //   name,
  //   venue,
  //   date,
  //   timeSlot,
  //   description,
  // });

  try {
    const newEvent = await Event.create(req.body);
    console.log(newEvent)
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/createBooking", async (req, res) => {
  
  const { adults, children, date, timeSlot, event } = req.body;

 
try {
  const newBooking = await Booking.create(req.body);
  console.log(newBooking)
  res.status(201).json(newBooking);
} catch (err) {
  console.error('Registration error:', err);
  res.status(500).json({ error: err.message });
}


});
