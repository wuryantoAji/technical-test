import express from "express";
import {
    createUser,
    updateUser,
    getUserByID,
    getUser
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUser);
router.get('/users/:id', verifyUser, adminOnly, getUserByID);
router.post('/users', verifyUser, adminOnly, createUser);
router.patch('/users/:id', verifyUser, updateUser);

export default router;