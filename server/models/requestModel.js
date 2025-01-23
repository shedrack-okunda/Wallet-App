import mongoose from "mongoose";

const { Schema, model } = mongoose;

const requestSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "cancel"],
    },
  },
  { timestamps: true }
);

const Request = model("Request", requestSchema);
export default Request;
