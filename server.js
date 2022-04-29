import express from "express";
import userLoader from "./routes/userRoutes.js";
import routesLoader from "./routes/userBikeRouteRoutes.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Connected to mongoose
const DataBaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection established with mongo");
  } catch (error) {
    console.log("DB error", error);
  }
};

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
// Testing mongoose

// end of testing mongoose
(async () => {
  await DataBaseConnect();
  //addMiddleware();
  app.use("/routes", routesLoader);
  app.use("/", userLoader);
})();

app.listen(8080);
