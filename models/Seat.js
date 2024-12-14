// const mongoose = require("mongoose");

// const seatSchema = new mongoose.Schema({
//   id: { type: String, required: true },  // Seat number
//   isBooked: { type: Boolean, default: false }  // Booking status
// });

// module.exports = mongoose.model("Seat", seatSchema);


// const mongoose = require("mongoose");

// const seatSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   isBooked: { type: Boolean, default: false },
// });

// const Seat = mongoose.model("Seat", seatSchema);

// module.exports = Seat;


// const mongoose = require("mongoose");

// const seatSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: true,
//   },
//   isBooked: {
//     type: Boolean,
//     default: false,  // Initially, all seats are not booked
//   },
// });

// const Seat = mongoose.model("Seat", seatSchema);

// module.exports = Seat;

const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatId: {
    type: String,  // Change _id to seatId as string
    required: true,
    unique: true
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  // Other seat properties can go here
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
