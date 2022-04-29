import express from "express";
import { createPost } from "../controller/feed.js";

const router = express.Router();
import { getSingleUserInfo, getUserInfo } from "../controller/users.js";

router.post("/routes", createPost);

router.get("/:user/:password", getSingleUserInfo);

export default router;
