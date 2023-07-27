// addUser.js
const {ShowData} = require('../../models/mainSchema');
const { v4: uuidv4 } = require('uuid');
const generateCustomID = require('../customids')

const Add = async(req, res , next) => {
  const { Content } = req.body;

  const userid = req.user[1].userid; 


  // Create a new user document
  console.log(req.user[1].userid)
  const newUser = new ShowData({  Content , userid:userid , id:generateCustomID() });

  // Save the user to the database
  newUser.save()
    .then((savedUser) => {
      console.log('User added successfully', savedUser);
      res.status(201).json({ message: 'User added successfully', user: savedUser });
    })
    .catch((err) => {
      console.error('Error adding user:', err);
      res.status(500).json({ error: 'Error adding user' });
    });
};

module.exports = Add;