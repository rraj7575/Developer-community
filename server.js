const express = require('express');
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoAwsURL

//Connect to mongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err) )

//Passport middleware
app.use(passport.initialize())
require('./config/passport')(passport)

//Api Routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))