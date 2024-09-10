import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    discount: {
      type: Number,
      required: [true, "Discount percentage is required"],
      min: [1, "Discount must be at least 1%"],
      max: [100, "Discount cannot exceed 100%"],
    },
    fromDate: {
      type: String,
      required: [true, "Start date is required"],
    },
    toDate: {
      type: String,
      required: [true, "End date is required"],
    },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
