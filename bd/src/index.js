import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import portfolioRoutes from "./routes/portfolio.js";
import contentRoutes from "./routes/content.js";
import uploadRoutes from "./routes/upload.js";
import offerRoutes from "./routes/offers.js";
import { connectDB } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Build allowed origins list from env
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:4173",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // Allow exact matches
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow all Vercel preview deployments for this project
    if (origin.endsWith(".vercel.app")) return callback(null, true);
    // Allow inkjunction.com and subdomains
    if (origin.endsWith("inkjunction.com")) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (origin.endsWith(".vercel.app")) return callback(null, true);
      if (origin.endsWith("inkjunction.com")) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Static file serving for locally stored images (fallback / dev)
app.use("/img", express.static(path.join(__dirname, "img")));

// Routes
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/offers", offerRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Ink Junction API is running",
    environment: process.env.NODE_ENV,
    cloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
  });
});

// One-time seed endpoint — protected by SEED_SECRET env var
app.get("/api/seed", async (req, res) => {
  const secret = req.query.secret;
  if (!secret || secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ error: "Unauthorized — provide ?secret=YOUR_SEED_SECRET" });
  }

  try {
    const { prisma } = await import("./config/db.js");

    const portraitItems = [
      { type: "image", src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80", style: "Portrait", caption: "Realistic Face Portrait", beforeSrc: null },
      { type: "image", src: "https://images.unsplash.com/photo-1590246815117-6ca7632c2b11?w=800&q=80", style: "Portrait", caption: "Detailed Eye Portrait", beforeSrc: null },
      { type: "image", src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80", style: "Portrait", caption: "Custom Portrait Design", beforeSrc: null },
    ];

    const coverupItems = [
      { type: "image", src: "https://images.unsplash.com/photo-1564415315949-7a0c4b9b06d0?w=800&q=80", style: "Coverup", caption: "Rose Coverup Transformation", beforeSrc: "https://images.unsplash.com/photo-1527090526205-beaac8dc3c62?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&q=80", style: "Coverup", caption: "Dragon Sleeve Coverup", beforeSrc: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?w=800&q=80" },
    ];

    // Only add if not already seeded
    const existingPortrait = await prisma.portfolio.count({ where: { style: "Portrait" } });
    const existingCoverup = await prisma.portfolio.count({ where: { style: "Coverup" } });

    let added = 0;
    if (existingPortrait === 0) {
      await prisma.portfolio.createMany({ data: portraitItems });
      added += portraitItems.length;
    }
    if (existingCoverup === 0) {
      await prisma.portfolio.createMany({ data: coverupItems });
      added += coverupItems.length;
    }

    const total = await prisma.portfolio.count();
    res.json({
      success: true,
      message: added > 0 ? `Added ${added} items` : "Already seeded — nothing to add",
      totalPortfolioItems: total,
      portrait: existingPortrait === 0 ? "added" : "already exists",
      coverup: existingCoverup === 0 ? "added" : "already exists",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Something went wrong!" });
});

// Self-ping to prevent Render free tier cold start (every 14 minutes)
const keepAlive = () => {
  const url = process.env.RENDER_EXTERNAL_URL;
  if (process.env.NODE_ENV === "production" && url) {
    setInterval(async () => {
      try {
        await fetch(`${url}/api/health`);
        console.log(" Keep-alive ping sent");
      } catch (e) {
        console.warn(" Keep-alive ping failed:", e.message);
      }
    }, 14 * 60 * 1000); // every 14 minutes
  }
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
      console.log(` Environment: ${process.env.NODE_ENV}`);
      console.log(` Allowed origins: ${allowedOrigins.join(", ")}`);
      keepAlive();
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
