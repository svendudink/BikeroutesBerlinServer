import multer from "multer";
import path from "path";
import MulterGoogleCloudStorage from "multer-google-storage";
import { upload } from "../controller/filecontroller.js";

// const uploadHandler = multer({
//   storage: new MulterGoogleCloudStorage(),
// });

// app.post("/upload", uploadHandler.any(), (req, res) => {
//   console.log(req.files);
//   res.json(req.files);
// });

// var multerGoogleStorage = require("multer-cloud-storage");

// app.post("/upload", uploadHandler.any(), function (req, res) {
//   console.log(req.files);
//   res.json(req.files);
// });

const multerUploads = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, next) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      next(new Error("File type is not supported"), false);
      return;
    }
    next(null, true);
  },
});

const multerFiles = multer({
  // storage: multer.diskStorage({}),
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./tmp/my-uploads");
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, next) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".zip" && ext !== ".jpg" && ext !== ".kml" && ext !== ".kmz") {
      next(new Error("File type is not supported"), false);
      return;
    }
    next(null, true);
  },
});

export { multerUploads, multerFiles };
