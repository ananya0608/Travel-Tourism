const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
    trim: true,
   
  },
  NumberOfPeople: {
    type: Number,
    required: true,
    trim: true,
    maxlength: 50,
  },
  ArrivalDate: {
    type: Date,
    required: true,
    unique: true,
    trim: true,
   
  },
  leavingDate: {
    type: Date,
    required: true,
   
  },
});

const Book= mongoose.model('Book', bookSchema);

module.exports = Book;
