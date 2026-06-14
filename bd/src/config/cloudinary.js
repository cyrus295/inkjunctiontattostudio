import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage that uploads directly to Cloudinary
export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "inkjunction",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "webm"],
    resource_type: "auto", // handles both images and videos
  },
});

export { cloudinary };
