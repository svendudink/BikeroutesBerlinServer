import express from "express";
import { profile } from "../controller/profile.js";

import { multerUploads } from "../middlewares/multer.js";
const router = express.Router();

router.get("/", profile);

export default router;
