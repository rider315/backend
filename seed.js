// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Seat = require("./models/Seat");

// dotenv.config();

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB:", err));

// const seedSeats = async () => {
//   try {
//     await Seat.deleteMany(); // Clear existing data
//     const seats = [];
//     for (let i = 1; i <= 80; i++) {
//       seats.push({ id: `S${i}`, isBooked: false });
//     }
//     await Seat.insertMany(seats);
//     console.log("Database seeded!");
//     process.exit();
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     process.exit(1);
//   }
// };

// seedSeats();


const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Seat = require("./models/Seat");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

const seedSeats = async () => {
  try {
    await Seat.deleteMany(); // Clear existing data
    const seats = [];
    for (let i = 1; i <= 80; i++) {
      seats.push({ seatId: `S${i}`, isBooked: false });  // Use seatId here
    }
    await Seat.insertMany(seats);
    console.log("Database seeded!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedSeats();
