
const mongoose = require('mongoose');

const contactSchema= new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
    
  },
  subject: {
    type: String,
    required: true,
    minlength: 8,
  },


  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
   
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;