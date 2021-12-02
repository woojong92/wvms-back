require("dotenv").config();

const cors = require('cors');

const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const api = require('./api');
const jwtMiddleware = require('./libs/jwtMiddleware');

const app = express()
const port = process.env.PORT || 3000
const MONGO_URI = 'mongodb://localhost:27017/test_db';

const mongoose = require('mongoose');
const mongo_uri = "mongodb+srv://woody:IvOJdBtIPNtAMiwA@cluster0.vqqlf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useFindAndModify: false 
}).then(() => {
  console.log('Connected to MongoDB')
}).catch(e => {console.log(e);})

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(jwtMiddleware);
// app.use(function(req, res, next) {
//   console.log('jwtmiddleware');
//   next();
// });
app.use("/api", api);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})