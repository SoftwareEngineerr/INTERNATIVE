const { loginData } = require('../../models/mainSchema');

const Edit = async (req, res) => {
  const { noteid, Name , Role , id} = req.body;
  try {
    // Find the loginData document with the given _id in the database
    const show = await loginData.findOne({ id: id });
    console.log(show);

    // If the document with the given _id does not exist, return an error
    if (!show) {
      console.log('Document not found');
      return res.status(404).json({ error: 'Document not found' });
    }

    // Update the Name property of the found document
    // show.Name = Name;
    show.role = Role;

    // Save the updated document to the database
    await show.save();

    // Send the response
    res.status(200).json({ message: 'Document updated successfully', user: show });
  } catch (err) {
    console.error('Error finding or updating document:', err);
    res.status(500).json({ error: 'Error finding or updating document' });
  }
};

module.exports = Edit;
