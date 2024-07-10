import mongoose, { Schema } from "mongoose";

const kycSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  cardIdFront: {
    type: String,
    required: true,
  },
  cardIdBack: {
    type: String,
    required: true,
  },
  selfieImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  },
  deletedBy: {
    type: String,
    required: false,
  },
  deletedReason: {
    type: String,
    required: false,
  },
});

const KYC =
  mongoose.models.KYC || mongoose.model("KYC", kycSchema, "kyc_verfis");

export default KYC;
