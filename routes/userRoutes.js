import express from "express";

const router = express.Router();
import { getSingleUserInfo, getUserInfo } from "../controller/users.js";

router.get("/biking", (req, res, next) => {
  res.send({ msg: "test route" });
});

router.get("/user", getUserInfo);

router.get("/:user/:password", getSingleUserInfo);

export default router;
