const { ShowData } = require('../../models/mainSchema');

const Delete = async (req, res) => {
  try {
    const { noteid } = req.body;
    const userid = req.user[1].userid;

    // Find the document with the matching id and the user's id
    const foundData = await ShowData.findOne({ userid: userid, id: noteid});

    if (!foundData) {
      return res.status(404).json({ message: `Post with id ${noteid} not found for the current user` });
    }

    // Delete the document with the matching id and the user's id
    const result = await ShowData.deleteOne({ userid: userid, id: noteid });

    console.log('User deleted successfully', result);
    res.status(200).json({ message: 'User deleted successfully', result });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = Delete;
