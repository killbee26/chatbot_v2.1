const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const User = require('./models/User')

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




const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
