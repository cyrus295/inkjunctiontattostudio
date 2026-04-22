import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
PortfolioSchema.index({ style: 1 });
PortfolioSchema.index({ createdAt: -1 });

export default mongoose.model("Portfolio", PortfolioSchema);
