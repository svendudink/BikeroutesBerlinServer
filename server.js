import express from "express";
import userLoader from "./routes/userRoutes.js";
import routesLoader from "./routes/userBikeRouteRoutes.js";
import signupLoader from "./routes/singupRoutes.js";
import profileLoader from "./routes/profileRoutes.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import passportConfig from "./config/passport.js";
import { cloudinaryconfig } from "./config/cloudinary.js";
import { profile } from "console";
dotenv.config();
console.log("process.env.GC", process.env.GCS_KEYFILE);
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
cloudinaryconfig();

app.use(passport.initialize());
passportConfig(passport);
// Testing mongoose

// end of testing mongoose

//IIFE
(async () => {
  await DataBaseConnect();
  //addMiddleware();
  app.use("/signup", signupLoader);
  app.use("/routes", routesLoader);
  app.use("/login", userLoader);
  app.use("/profile", profileLoader);
})();

app.listen(8080);

// uploading pictures cloudinary
// amazon s3 is scalable

// install multer middleware,  // use filefilter ,, what is multer

// import cloudinary

//mongoose method findOne

// hashPassword library convert to : bcrypt npm

// verify all fields are filled

// verify email with regex

// verify password length and strength with regex

// Second spike
// JSON web token. to create webtoken
