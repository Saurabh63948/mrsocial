import express from "express";
import { db } from "./connect.js";  // Ensure database connection works
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// ✅ Enable CORS with credentials
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow cookies & authentication headers
}));

// ✅ Middleware for JSON parsing and cookies
app.use(express.json());
app.use(cookieParser());

// ✅ Set Headers to allow credentials
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

// ✅ Start Server
app.listen(8800, () => {
  console.log("🚀 API is running on port 8800");
});
