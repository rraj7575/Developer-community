const mongoose = require('mongoose')
const Schema = mongoose.Schema
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    require: true
  },
  handle: {
    type: String,
    require: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  status: {
    type: String,
    require: true
  },
  skills: {
    type: [String],
    require: true
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        require: true
      },
      company: {
        type: String,
        require: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        require: true
      },
      to: {
        type: Date,
        require: true
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        require: true
      },
      degree: {
        type: String,
        require: true
      },
      fieldofstudy: {
        type: String,
        require: true
      },
      from: {
        type: Date,
        require: true
      },
      to: {
        type: Date,
        require: true
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
      }
    }
  ],
  social: {
    youtube:{
      type: String
    },
    twitter:{
      type: String
    },
    facebook:{
      type: String
    },
    linkedin:{
      type: String
    },
    instagram: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    }
  }
})

module.exports = Profile = mongoose.model('profiles', profileSchema)