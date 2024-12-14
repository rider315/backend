const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatId: {
    type: String,  
    required: true,
    unique: true
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
