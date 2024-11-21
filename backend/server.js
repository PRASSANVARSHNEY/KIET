import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import examRoutes from "./routes/examRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import cors from "cors";

// Load environment variables
dotenv.config();

// Debug environment variables (only in development)
if (process.env.NODE_ENV === "development") {
  console.log("Environment Variables:");
  console.log(`PORT: ${process.env.PORT}`);
  console.log(`MONGO_URL: ${process.env.MONGO_URL}`);
  console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL}`);
}

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/exams", examRoutes); // Exam-related routes

// Serve Frontend (React app) in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("<h1>Server is running</h1>");
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
