const generateCustomID = () => {
    // Get the current timestamp in milliseconds
    const timestamp = new Date().getTime().toString();
  
    // Generate a random number between 0 and 9999
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
    // Concatenate the timestamp and random number to create the custom ID
    const customID = timestamp + randomNum;
  
    return customID;
  }

module.exports = generateCustomID;