import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import { errorMiddleware } from "./middleware/error.middleware.js";

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import logRoutes from "./routes/log.routes.js";
import offerRoutes from "./routes/offer.routes.js";
import orderRoutes from "./routes/order.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/logs", logRoutes);
app.use("/api/v1/offers", offerRoutes);
app.use("/api/v1/order", orderRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// error handler middleware
app.use(errorMiddleware);
export { app };
