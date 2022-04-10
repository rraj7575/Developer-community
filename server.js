const express = require('express');
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const app = express()
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server running on port ${port}`))
// const client = require('socket.io').listen(server);
const Chat = require('./models/Chat')
const Post = require('./models/Post')

// client.on('connection', function (socket) {
//   console.log('Socket connected..', socket.id)
// })

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoAwsURL

//Connect to mongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err) )

//Passport middleware
app.use(passport.initialize())
require('./config/passport')(passport)

//Api Routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)
//Server static assets if in production


app.use(express.static('client/build'))
app.get('*', (req, res) => {
  const index = path.join(__dirname, 'client', 'build', 'index.html');
  res.sendFile(index);
  // res.sendFile(path.resolve(__filename, 'client', 'build', 'index.html'))
})

// if (process.env.NODE_ENV === 'production') {
//   //Set static folder
//   console.log('in production')
//   app.use(express.static('client/build'))
//   app.get('*', (req, res) => {
//     const index = path.join(__dirname, 'client', 'build', 'index.html');
//     res.sendFile(index);
//     // res.sendFile(path.resolve(__filename, 'client', 'build', 'index.html'))
//   })
// }

// client.on('connection', function (socket) {
//   console.log('Socket connected')
//   // const chat = db.coll
//   const sendStatus = function (s) {
//     socket.emit('status', s)
//   }
//   const res = 'from server'

  // Chat.find().limit(100).sort({_id: 1}).toArray(function (err, res) {
  //   if (err) throw err
  //
  // })

//   socket.on('previousChat', function () {
//     Chat.find()
//         .sort({id: -1})
//         .then(chats => client.emit('output', chats))
//   })
//
//   socket.on('input', function (data) {
//     let message = data.msg
//     const user = data.user
//     if (message === '') {
//       sendStatus('Please enter name and message')
//     } else {
//       const chat = new Chat({message, user})
//       chat.save().then(chat => {
//         if (chat) {
//           client.emit('output', [chat])
//           // Chat.find()
//           //     .sort({id: -1})
//           //     .then(chats => client.emit('output', chats))
//         }
//       })
//     }
//   })
//   socket.on('clear', function () {
//     socket.emit('Cleared')
//   })
// })
