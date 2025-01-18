import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    sender: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    receiver: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    transactionType: {
      type: String,
      required: true,
      default: "payment",
      enum: ["payment", "transfer", "deposit", "refund"],
    },
    transactionId: { type: String },
    reference: {
      type: String,
      required: true,
      enum: ["transaction ID", "payment reference"],
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
