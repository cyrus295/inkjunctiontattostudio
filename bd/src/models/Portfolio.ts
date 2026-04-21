import mongoose, { Schema, Document } from "mongoose";

export interface IPortfolio extends Document {
  type: "image" | "video";
  src: string;
  style: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
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

export default mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);