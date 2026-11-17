import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  category: string;
  categoryLabel: string;
  aspect: "square" | "wide" | "tall";
  image: string;
  description: string;
  location: string;
  meta: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: false, default: "Gallery Photo", trim: true },
    category: { type: String, required: false, default: "general" },
    categoryLabel: { type: String, required: false, default: "Gallery" },
    aspect: {
      type: String,
      enum: ["square", "wide", "tall"],
      default: "square",
    },
    image: { type: String, required: true },
    description: { type: String, default: "", trim: true },
    location: { type: String, default: "Dhaka Facility", trim: true },
    meta: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);

export default GalleryItem;
