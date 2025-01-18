import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import colors from "colors";
import cors from "cors";
// import  connectDB from "./config/db";
import { errorHandler } from "./middlewares/errorHandler.js";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

// connectDB();
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to DB"));

const app = express();
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.options("*", cors());

app.use(fileUpload({ useTempFiles: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 3000;

app.use(errorHandler);
app.use("/api/users", userRoutes);
app.use("/api/", transactionRoutes);
app.use("/api/", requestRoutes);

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.listen(PORT, () => {
  console.log(
    `Server Running on Port: http://localhost:${PORT} at ${new Date().toLocaleString(
      "en-us"
    )}`.bgCyan.bold.underline
  );
});
