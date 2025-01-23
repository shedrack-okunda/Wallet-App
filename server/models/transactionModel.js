import mongoose from "mongoose";

const { Schema, model } = mongoose;

const transactionSchema = new Schema(
  {
    amount: { type: Number, required: true },
    sender: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, required: true, ref: "User" },
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

const Transaction = model("Transaction", transactionSchema);
export default Transaction;
