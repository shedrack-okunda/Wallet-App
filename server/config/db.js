import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(
      `MongoDB connected: ${con.connection.host}`.bgGreen.black.bold.underline
    );
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.bold.underline);
    process.exit(1);
  }
};

export default connectDB;
