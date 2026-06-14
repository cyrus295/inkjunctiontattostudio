import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { cloudinaryStorage } from "../config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// ─── Storage Strategy ────────────────────────────────────────────────────────
// If Cloudinary env vars are set → upload to cloud (production)
// Otherwise → save to local disk (development fallback)

const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../img/1"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|mp4|webm/;
  const mimeOk = allowed.test(file.mimetype);
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
  if (mimeOk && extOk) return cb(null, true);
  cb(new Error("Only images and videos are allowed!"));
};

const upload = multer({
  storage: isCloudinaryConfigured ? cloudinaryStorage : localStorage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});

// POST /api/upload
router.post("/", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Cloudinary returns a full https URL in req.file.path
    // Local disk returns just the filename — build a relative URL
    const fileUrl = isCloudinaryConfigured
      ? req.file.path
      : `/img/1/${req.file.filename}`;

    res.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

export default router;
