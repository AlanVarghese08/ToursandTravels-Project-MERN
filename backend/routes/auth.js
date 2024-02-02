import express from "express";
import { getUserId, login, register } from "../controllers/authController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/userid", verifyToken, (req, res) => {
  const userId = req.user ? req.user.id : null;
  res.json({ success: true, userId: userId });
});

export default router;
