import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPartner extends Document {
  name?: string;
  logoUrl: string;
  category: "client" | "certification" | "partner";
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: { type: String, default: "", trim: true },
    logoUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["client", "certification", "partner"],
      default: "client",
    },
  },
  {
    timestamps: true,
  }
);

const Partner: Model<IPartner> =
  mongoose.models.Partner || mongoose.model<IPartner>("Partner", PartnerSchema);

export default Partner;
