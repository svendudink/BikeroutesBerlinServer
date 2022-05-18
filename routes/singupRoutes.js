import express from "express";
import { signUp } from "../controller/signup.js";
import { multerUploads } from "../middlewares/multer.js";
const router = express.Router();

router.post("/", multerUploads.single("image"), signUp);

export default router;
