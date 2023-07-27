const { loginData } = require('../../models/mainSchema');

const adminDelete = async (req, res) => {
  try {
    const { id } = req.body;
    const userid = req.user[1].userid;

    // Find the document with the matching id and the user's id
    const foundData = await loginData.findOne({ id: id});

    if (!foundData) {
      return res.status(404).json({ message: `Delete with id ${id} not found for the current user` });
    }

    // Delete the document with the matching id and the user's id
    const result = await loginData.deleteOne({  id: id });

    console.log('User deleted successfully', result);
    res.status(200).json({ message: 'User deleted successfully', result });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = adminDelete;
