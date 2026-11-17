import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHeroBanner extends Document {
  title: string;
  subtitle: string;
  imageUrl: string;
  altText: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HeroBannerSchema = new Schema<IHeroBanner>(
  {
    title: { type: String, default: "", trim: true },
    subtitle: { type: String, default: "", trim: true },
    imageUrl: { type: String, required: true },
    altText: { type: String, default: "Texpart Hero Banner", trim: true },
    linkUrl: { type: String, default: "/services/private-jobs", trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const HeroBanner: Model<IHeroBanner> =
  mongoose.models.HeroBanner ||
  mongoose.model<IHeroBanner>("HeroBanner", HeroBannerSchema);

export default HeroBanner;
