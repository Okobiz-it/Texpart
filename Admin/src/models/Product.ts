import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  division: "private-jobs" | "commercial-jobs";
  category: string;
  description: string;
  frontImage: string;
  images: string[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    division: {
      type: String,
      required: true,
      enum: ["private-jobs", "commercial-jobs"],
    },
    category: { type: String, default: "General", trim: true },
    description: { type: String, default: "" },
    frontImage: { type: String, required: true },
    images: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model in Next.js development
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
