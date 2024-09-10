import express from "express";
import { getAllLogs } from "../controllers/log.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(isAuthenticated, isAdmin, getAllLogs);

export default router;
