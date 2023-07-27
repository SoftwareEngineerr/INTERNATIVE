const { default: mongoose } = require("mongoose");
const connectionString = 'mongodb://localhost:27017/inter';


// Connect to MongoDB
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
