import express from "express";
import { authenticate } from "../middleware/auth.js";
import { updateUser, getUser } from "../controllers/user.js";

const router = express.Router();

router.put("/update-user", authenticate, updateUser);
router.get("/", authenticate, getUser);

export default router;