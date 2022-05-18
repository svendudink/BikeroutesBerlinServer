import multer from "multer";
import path from "path";

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

export { multerUploads };
