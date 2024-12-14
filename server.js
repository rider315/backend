// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const Seat = require("./models/Seat");

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Use CORS middleware (only once)
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:5000']
// }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("Connected to MongoDB"))
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB:", err);
//     process.exit(1); // Exit the process if DB connection fails
//   });

// // API Endpoints

// // Fetch all seats (booked and unbooked)
// app.get("/seats", async (req, res) => {
//   try {
//     const seats = await Seat.find(); // Fetch all seats (booked and unbooked)
//     res.json(seats);  // Send all seat data back
//   } catch (error) {
//     console.error("Error fetching seats:", error);
//     res.status(500).json({ message: "Error fetching seats" });
//   }
// });

// // Book seats
// app.post("/book", async (req, res) => {
//   const { seats } = req.body;

//   if (!seats || seats.length < 1) {
//     return res.status(400).json({ message: "Invalid number of seats" });
//   }

//   try {
//     const bookedSeats = [];

//     // Loop through the seats to book
//     for (let seat of seats) {
//       const seatToUpdate = await Seat.findOne({ seatId: seat.seatId });  // Match by seatId

//       if (!seatToUpdate || seatToUpdate.isBooked) {
//         return res.status(400).json({ message: "One or more seats are already booked." });
//       }

//       seatToUpdate.isBooked = true;
//       await seatToUpdate.save(); // Save the updated seat in the database
//       bookedSeats.push(seatToUpdate.seatId); // Store the seat id of the booked seat
//     }

//     res.json({ bookedSeats });
//   } catch (error) {
//     console.error("Error booking seats:", error);
//     res.status(500).json({ message: "Error booking seats" });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const Seat = require("./models/Seat");

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5000'] }));

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB:", err);
//     process.exit(1);
//   });

// app.get("/seats", async (req, res) => {
//   try {
//     const seats = await Seat.find();
//     res.json(seats);
//   } catch (error) {
//     console.error("Error fetching seats:", error);
//     res.status(500).json({ message: "Error fetching seats" });
//   }
// });

// app.post("/book", async (req, res) => {
//   const { seats } = req.body;

//   if (!seats || seats.length < 1) {
//     return res.status(400).json({ message: "Invalid number of seats" });
//   }

//   try {
//     const updatedSeats = [];

//     for (let seat of seats) {
//       const seatToUpdate = await Seat.findOne({ seatId: seat.seatId });
//       if (!seatToUpdate || seatToUpdate.isBooked) {
//         return res.status(400).json({ message: `Seat ${seat.seatId} is unavailable.` });
//       }
//       seatToUpdate.isBooked = true;
//       await seatToUpdate.save();
//       updatedSeats.push(seatToUpdate.seatId);
//     }

//     res.json({ bookedSeats: updatedSeats });
//   } catch (error) {
//     console.error("Error booking seats:", error);
//     res.status(500).json({ message: "Error booking seats" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Seat = require("./models/Seat");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5000', 'https://backend-cpu9.onrender.com', 'https://frontend-a7ch.onrender.com'] }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    });

// API to fetch all seats
app.get("/seats", async (req, res) => {
    try {
        const seats = await Seat.find().sort({ seatId: 1 }); // Sort seats by seatId
        res.json(seats);
    } catch (error) {
        console.error("Error fetching seats:", error);
        res.status(500).json({ message: "Error fetching seats" });
    }
});

// API to book seats atomically
// app.post("/book", async (req, res) => {
//     const { seats } = req.body;

//     if (!seats || seats.length < 1) {
//         return res.status(400).json({ message: "No seats selected for booking." });
//     }

//     try {
//         // Step 1: Fetch and check seat availability
//         const seatIds = seats.map(seat => seat.seatId);
//         const availableSeats = await Seat.find({ seatId: { $in: seatIds }, isBooked: false });

//         if (availableSeats.length !== seats.length) {
//             return res.status(400).json({ message: "One or more seats are already booked." });
//         }

//         // Step 2: Atomically update seats using bulkWrite
//         const operations = seatIds.map(seatId => ({
//             updateOne: {
//                 filter: { seatId: seatId, isBooked: false },
//                 update: { $set: { isBooked: true } },
//             },
//         }));

//         const result = await Seat.bulkWrite(operations);

//         if (result.nModified !== seats.length) {
//             return res.status(400).json({ message: "Some seats could not be booked. Please retry." });
//         }

//         res.json({ message: "Seats successfully booked.", bookedSeats: seatIds });
//     } catch (error) {
//         console.error("Error booking seats:", error);
//         res.status(500).json({ message: "Error booking seats" });
//     }
// });
app.post("/book", async (req, res) => {
  const { seats } = req.body;

  if (!seats || seats.length < 1) {
      return res.status(400).json({ message: "No seats selected for booking." });
  }

  try {
      // Step 1: Fetch and check seat availability
      const seatIds = seats.map(seat => seat.seatId);
      const availableSeats = await Seat.find({ seatId: { $in: seatIds }, isBooked: false });

      if (availableSeats.length !== seats.length) {
          return res.status(400).json({ message: "One or more seats are already booked." });
      }

      // Step 2: Atomically update seats using bulkWrite
      const operations = seatIds.map(seatId => ({
          updateOne: {
              filter: { seatId: seatId, isBooked: false },
              update: { $set: { isBooked: true } },
          },
      }));

      const result = await Seat.bulkWrite(operations);

      // Use `result.modifiedCount` to check the number of updated seats
      if (result.modifiedCount !== seats.length) {
          return res.status(400).json({ message: "Some seats could not be booked. Please retry." });
      }

      res.json({ message: "Seats successfully booked.", bookedSeats: seatIds });
  } catch (error) {
      console.error("Error booking seats:", error);
      res.status(500).json({ message: "Error booking seats" });
  }
});


// API to reset all seats for testing
// app.post("/reset", async (req, res) => {
//     try {
//         await Seat.updateMany({}, { $set: { isBooked: false } });
//         res.json({ message: "All seats have been reset." });
//     } catch (error) {
//         console.error("Error resetting seats:", error);
//         res.status(500).json({ message: "Error resetting seats" });
//     }
// });
app.post("/reset-seats", async (req, res) => {
  try {
      await Seat.updateMany({}, { $set: { isBooked: false } });
      res.json({ message: "All seats have been reset." });
  } catch (error) {
      console.error("Error resetting seats:", error);
      res.status(500).json({ message: "Error resetting seats" });
  }
});


// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
