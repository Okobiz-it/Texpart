import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuotation extends Document {
  // Quotation Document Meta
  ref_no?: string;
  quote_date?: Date;
  client_name?: string;
  organization_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  subject?: string;

  // Scope & Financials
  software_columns?: any[];
  software_rows?: any[];
  software_amount?: number;
  grand_total?: number;
  in_words?: string;
  terms_conditions?: string;
  project_breakdown?: string;
  client_requirements?: string;
  deliverables?: string;
  additional_notes?: string;

  // Signatory & Org
  company_signatory_name?: string;
  company_signatory_title?: string;
  company_phone?: string;
  company_email?: string;

  // Status & Dispatch
  doc_type?: "QUOTATION" | "INQUIRY" | string;
  status: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "NEW" | "IN_PROGRESS" | "QUOTED" | "CLOSED" | string;
  email_sent_at?: Date | null;

  // Storefront Lead Compatibility
  fullName?: string;
  companyName?: string;
  productName?: string;
  moqQuantity?: string;
  noteContent?: string;
  adminNotes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const QuotationSchema = new Schema<IQuotation>(
  {
    ref_no: { type: String, trim: true, sparse: true },
    quote_date: { type: Date, default: Date.now },
    client_name: { type: String, trim: true },
    organization_name: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, default: "" },
    subject: {
      type: String,
      default: "Quotation for Garment Packaging & Apparel Development Solutions",
      trim: true,
    },

    software_columns: { type: Schema.Types.Mixed, default: [] },
    software_rows: { type: Schema.Types.Mixed, default: [] },
    software_amount: { type: Number, default: 0 },
    grand_total: { type: Number, default: 0 },
    in_words: { type: String, default: "" },
    terms_conditions: { type: String, default: "" },
    project_breakdown: { type: String, default: "" },
    client_requirements: { type: String, default: "" },
    deliverables: { type: String, default: "" },
    additional_notes: { type: String, default: "" },

    company_signatory_name: { type: String, default: "Md. Sorower Jahan" },
    company_signatory_title: { type: String, default: "Managing Director, Texpart Ltd." },
    company_phone: { type: String, default: "+880 1711-234567" },
    company_email: { type: String, default: "info@texpartbd.com" },

    doc_type: { type: String, default: "QUOTATION" },
    status: { type: String, default: "DRAFT" },
    email_sent_at: { type: Date, default: null },

    // Storefront inquiry fields
    fullName: { type: String, trim: true },
    companyName: { type: String, trim: true },
    productName: { type: String, default: "General Production", trim: true },
    moqQuantity: { type: String, default: "5,000 pcs", trim: true },
    noteContent: { type: String, default: "" },
    adminNotes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Quotation: Model<IQuotation> =
  mongoose.models.Quotation || mongoose.model<IQuotation>("Quotation", QuotationSchema);

export default Quotation;
