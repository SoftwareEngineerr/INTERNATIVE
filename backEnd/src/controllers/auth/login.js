const {loginData} = require('../../models/mainSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  try {
    const { Name, Password } = req.body;

    // Find the user by name
    const user = await loginData.findOne({ Name });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log(user.id)
    const token = jwt.sign({id:1232133 , role: user.role , userid: user.id} , 'ourvalues' , {expiresIn:'2 hours'})
    res.status(200).json({token : token ,role: user.role})


  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = login;
