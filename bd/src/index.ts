import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import portfolioRoutes from "./routes/portfolio";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for images
app.use('/img', express.static(path.join(__dirname, 'img')));

// Routes
app.use("/api/portfolio", portfolioRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Ink Junction Tatto API is running" });
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();