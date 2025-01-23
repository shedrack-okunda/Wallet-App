import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, min: 6, max: 12 },
    identificationType: {
      type: String,
      required: true,
      enum: ["driver license", "passport", "national ID"],
    },
    identificationNumber: {
      type: String,
      required: true,
      min: 6,
      max: 12,
      unique: true,
    },
    balance: { type: Number, default: 1000 },
    moneySend: { type: Number, default: 0 },
    moneyReceived: { type: Number, default: 0 },
    requestReceived: { type: Number, default: 0 },
    transactionLimit: { type: Number, default: 5000 },
    address: { type: String, required: true },
    image: { type: String },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
