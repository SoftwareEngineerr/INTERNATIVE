const { loginData } = require("../../models/mainSchema")


const showusers = async (req , res) =>{
    try {
        const people = await loginData.find({});
        res.status(200).json(people);
      } catch (err) {
        // If there is an error, send an error response
        console.error('Error retrieving data:', err);
        res.status(500).send('Error retrieving data');
      }
}

module.exports = showusers;