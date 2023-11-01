const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create
const ChatSchema = new Schema({
  message: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("chats", ChatSchema);
