import express from "express";
import {
    createAttendance,
    getAllAttendance
} from "../controllers/Attendance.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/attendances', verifyUser, getAllAttendance);
router.post('/attendances', verifyUser, createAttendance);

export default router;