// path: backend/server.js
import path from "path";
import express from "express";
import cors from "cors";
import "colors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

// ES module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

// Debug check
console.log("MONGO_URI:", process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Allow CORS for local dev and production
const allowedOrigins = [
  "http://localhost:5173", // Vite frontend (local dev)
  process.env.CLIENT_URL,  // deployed frontend
].filter(Boolean); // remove undefined values

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/contact", contactRoutes);

// Serve frontend (React build)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to the Ticket-App API" });
  });
}

// Error handler (last middleware)
app.use(errorHandler);

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
