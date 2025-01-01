import express from "express";
import {
    createAttendance,
    getAllAttendance
} from "../controllers/Attendance.js";
import { verifyUser } from "../middleware/AuthUser.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
      // Restrict file type to images only
      const fileTypes = /jpeg|jpg|png/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
  
      if (extName && mimeType) {
        cb(null, true);
      } else {
        cb(new Error("Only images are allowed!"));
      }
    },
});

router.get('/attendances', verifyUser, getAllAttendance);
router.post('/attendances', verifyUser, upload.single('photoFile'), createAttendance);

export default router;