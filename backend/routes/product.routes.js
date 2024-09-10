import express from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/").post(isAuthenticated, isAdmin, createProduct);
router.route("/:id").put(isAuthenticated, isAdmin, updateProduct);
router.route("/:id").delete(isAuthenticated, isAdmin, deleteProduct);

export default router;
