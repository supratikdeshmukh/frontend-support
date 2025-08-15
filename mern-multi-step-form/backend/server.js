// ✅ Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware: Enable CORS for cross-origin requests
app.use(cors());

// ✅ Middleware: Automatically parse incoming JSON request bodies
app.use(express.json());

// ✅ Routes: All /api/users requests will be handled by usersRoute
app.use("/api/users", usersRoute);

// ✅ Immediately Invoked Async Function to connect DB before starting server
(async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;

    // ⚠️ Good check: Ensure MongoDB URI exists in environment variables
    if (!uri) throw new Error("MONGO_URI not set in environment");

    // ✅ Connect to MongoDB with modern connection options
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");

    // ✅ Start server only after DB is connected
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit the process with failure
  }
})();
