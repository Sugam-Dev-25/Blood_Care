require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const connectDB = require("./app/config/db");

const authRoutes = require("./app/routes/authRoutes");
const userRoutes = require("./app/routes/userRoutes");
const donorRoutes = require("./app/routes/donorRoutes");
const hospitalRoutes = require("./app/routes/hospitalRoutes");
const bloodInventoryRoutes = require("./app/routes/bloodInventoryRoutes");
const bloodRequestRoutes = require("./app/routes/bloodRequestRoutes");
const adminRoutes = require("./app/routes/adminRoutes");
const donationRoutes = require("./app/routes/donationRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Database
connectDB();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Logger
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/blood-inventory", bloodInventoryRoutes);
app.use("/api/blood-request", bloodRequestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/donation", donationRoutes);


// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Blood Care API is running",
  });
});

// Server
app.listen(PORT, () => {
  console.log(`Blood Care server running on port ${PORT}`);
});