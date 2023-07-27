const {loginData} = require('../../models/mainSchema');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

const Register = async (req, res) => {
  try {
    const { Name, Password } = req.body;


    function generateCustomID() {
      // Get the current timestamp in milliseconds
      const timestamp = new Date().getTime().toString();
    
      // Generate a random number between 0 and 9999
      const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
      // Concatenate the timestamp and random number to create the custom ID
      const customID = timestamp + randomNum;
    
      return customID;
    }

    // Check if the user already exists
    const existingUser = await loginData.findOne({ Name });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    // Create a new user
    const newUser = new loginData({id: generateCustomID(), Name, Password: hashedPassword ,role:'user' });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Error registering user' });
  }
};

module.exports = Register;
