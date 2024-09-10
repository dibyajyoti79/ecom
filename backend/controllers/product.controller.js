import Product from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Log from "../models/log.model.js";

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalProducts: products.length, products },
        "All products fetched successfully"
      )
    );
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, stock } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    stock,
  });
  // Log the creation
  await Log.create({
    user: req.user._id,
    action: "create",
    product: product._id,
    changeDetails: { name, description, price, stock },
  });
  res
    .status(201)
    .json(new ApiResponse(200, null, "Product Created Successfully"));
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  const oldDetails = {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
  };
  const { name, description, price, stock } = req.body;
  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (stock) product.stock = stock;

  await product.save();

  // Log the update
  await Log.create({
    user: req.user._id,
    action: "update",
    product: product._id,
    changeDetails: {
      old: oldDetails,
      new: { name, description, price, stock },
    },
  });

  res.status(200).json(new ApiResponse(200, null, "product details updated"));
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  // Log the deletion
  await Log.create({
    user: req.user._id,
    action: "delete",
    product: product._id,
    changeDetails: { name: product.name, description: product.description },
  });

  await product.deleteOne();
  res
    .status(200)
    .json(new ApiResponse(200, null, "Product Deleted Successfully"));
});
