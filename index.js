const express  = require('express');
const mongoose = require('mongoose'); // Package to connect to our MongoDB
const bodyParser = require('body-parser'); 
const CORS = require('cors');
const PORT = process.env.PORT || 8000; 
const app  = express();

//Router
const itemRouter = require('./routes/itemRouter');

mongoose.connect('mongodb+srv://earon:password@cluster0.hmbtl.mongodb.net/test', (err) =>{
  console.error(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CORS());


app.use('/api/v1.0.0/items', itemRouter );

app.listen( 
  PORT, 
  () => { console.log(`App is running on port ${PORT}.`); 
});