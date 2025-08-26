import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Cross-Origin Resource Sharing (frontend <-> backend)
import connectDB from "./config/db.js";
import recordRoutes from "./routes/recordRoutes.js"; // ✅ Routes for CRUD records

// ✅ Load .env file (must be called before using process.env)
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Define allowed frontend origins
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173", // Dev frontend
  "https://frontendsupport.in", // **Enter Your Production frontend**
];

// ✅ Enable CORS with allowed origins + methods
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies/auth headers if needed
  })
);

// ✅ Built-in middleware to parse incoming JSON requests
app.use(express.json());

// ✅ API Routes (all CRUD requests for records go here)
app.use("/api/records", recordRoutes);

// ✅ 404 Not Found handler (for unmatched routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Error handling middleware (catches thrown errors)
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// ✅ Start backend server on defined PORT (fallback = 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
