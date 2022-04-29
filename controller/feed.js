import mongoose from "mongoose";
import path from "path";
import Bike from "../model/rides.js";

const createPost = async (req, res, next) => {
  console.log(req.body);
  await sendToMongo(
    req.body.name,
    req.body.latitude,
    req.body.longitude,
    req.body.dificulty
  );
  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString() },
  });
};

const sendToMongo = async (name, latitude, longitude, dificulty) => {
  const persona = new Bike({
    name: name,
    latitude: latitude,
    longitude: longitude,
    dificulty: dificulty,
  });
  console.log("check if works", persona);
  await persona.save();
};

// const writePost = async (req, res, next) => {
//   console.log(req.params.user, req.params.password);
//   try {
//     const singleUserInfo = await User.find({
//       user: req.params.user,
//       password: req.params.password,
//     }).exec();
//     res.status(200).json({ singleUserInfo });
//   } catch (error) {
//     res.status(500).json({
//       error: error,
//       msg: "more stuff broken",
//     });
//   }
// };

export { createPost };
