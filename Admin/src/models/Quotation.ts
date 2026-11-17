import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuotation extends Document {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  productName: string;
  moqQuantity: string;
  noteContent: string;
  status: "NEW" | "IN_PROGRESS" | "QUOTED" | "CLOSED";
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuotationSchema = new Schema<IQuotation>(
  {
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    productName: { type: String, default: "General Production", trim: true },
    moqQuantity: { type: String, default: "5,000 pcs", trim: true },
    noteContent: { type: String, default: "" },
    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "QUOTED", "CLOSED"],
      default: "NEW",
    },
    adminNotes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Quotation: Model<IQuotation> =
  mongoose.models.Quotation || mongoose.model<IQuotation>("Quotation", QuotationSchema);

export default Quotation;
