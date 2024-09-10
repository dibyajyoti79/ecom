import express from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getSpecialOffer,
  updateSpecialOffer,
} from "../controllers/offer.controller.js";

const router = express.Router();

router.route("/special").get(getSpecialOffer);
router.route("/special").put(isAuthenticated, isAdmin, updateSpecialOffer);

export default router;
