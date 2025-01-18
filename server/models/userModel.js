import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Enter your name"] },
    email: { type: String, required: [true, "Enter your email"], unique: true },
    phone: { type: String, required: [true, "Enter your phone number"] },
    password: {
      type: String,
      required: [true, "Enter your password"],
      min: [6, "Password must contain at least 6 numbers"],
      max: 12,
    },
    identificationType: {
      type: String,
      required: [true, "Enter your identification type"],
      enum: ["driver license", "passport", "national ID"],
    },
    identificationNumber: {
      type: String,
      required: [true, "Enter your identification number"],
      min: [6, "at least 6 numbers"],
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

const User = mongoose.model("User", userSchema);
export default User;
