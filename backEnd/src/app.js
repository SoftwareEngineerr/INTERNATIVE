const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const Router = require('./routes/router')
const cors = require('cors');


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', Router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
