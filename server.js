import express from "express";
import loader from "./routes/bikeways.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

// Connected to mongoose
const DataBaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection established with mongo");
  } catch (error) {
    console.log("DB error", error);
  }
};

(async () => {
  await DataBaseConnect();
  //addMiddleware();
  app.use("/", loader);
})();

app.listen(8080);
