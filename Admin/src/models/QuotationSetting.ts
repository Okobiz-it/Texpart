import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuotationSetting extends Document {
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuotationSettingSchema = new Schema<IQuotationSetting>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const QuotationSetting: Model<IQuotationSetting> =
  mongoose.models.QuotationSetting ||
  mongoose.model<IQuotationSetting>("QuotationSetting", QuotationSettingSchema);

export default QuotationSetting;
