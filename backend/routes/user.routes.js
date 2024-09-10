import express from "express";
import { register, login, checkAdmin } from "../controllers/user.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/admin-check").get(isAuthenticated, isAdmin, checkAdmin);

export default router;
