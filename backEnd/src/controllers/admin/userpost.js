const {ShowData} = require("../../models/mainSchema");
require('../../db/db')


const userpost = async (req ,res) =>{
    const { id } = req.body;
    try {
        const people = await ShowData.find({userid: id});
        res.status(200).json(people);
      } catch (err) {
        // If there is an error, send an error response
        console.error('Error retrieving data:', err);
        res.status(500).send('Error retrieving data');
      }
}

module.exports = userpost