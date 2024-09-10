import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: ["create", "update", "delete"],
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the product that was changed
      required: true,
    },
    changeDetails: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
