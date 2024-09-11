import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { createCheckoutSession } from "../controllers/order.controller.js";

const router = express.Router();

router
  .route("/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);

export default router;
