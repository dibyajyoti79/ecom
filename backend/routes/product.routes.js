import express from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/get-all").get(getAllProducts);
router.route("/create").post(isAuthenticated, isAdmin, createProduct);
router.route("/update/:id").put(isAuthenticated, isAdmin, updateProduct);
router.route("/delete/:id").delete(isAuthenticated, isAdmin, deleteProduct);

export default router;
