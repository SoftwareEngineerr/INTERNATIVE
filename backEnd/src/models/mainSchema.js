const { default: mongoose } = require("mongoose");

const Show = new mongoose.Schema({
    // _id: String,
    Name: String,
    Content: String,
    userid: String,
    noteid: String,
    id: String
});

const loginpage = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    role: String,
    // _id: String
    id:{
        type: String,
        required: true,
    }
  })

  // Create a Mongoose model
  const ShowData = mongoose.model('notes', Show);
  const loginData = mongoose.model('users', loginpage);

  module.exports =  {ShowData , loginData}