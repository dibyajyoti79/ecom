import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Offer from "../models/offer.model.js";

// Get the special offer
export const getSpecialOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findOne({});

  if (!offer) {
    throw new ApiError(404, "Special offer not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, offer, "Special offer fetched successfully"));
});

// Update the special offer
export const updateSpecialOffer = asyncHandler(async (req, res, next) => {
  const { discount, fromDate, toDate } = req.body;

  // Validate discount
  if (discount < 1 || discount > 100) {
    throw new ApiError(400, "Discount percentage must be between 1 and 100");
  }

  // Validate dates
  if (new Date(toDate) <= new Date(fromDate)) {
    throw new ApiError(400, "Valid until date must be after valid from date");
  }

  let offer = await Offer.findOne({});

  if (!offer) {
    // Create a new offer if one doesn't exist
    offer = await Offer.create({
      discount,
      fromDate,
      toDate,
    });
  } else {
    // Update existing offer
    offer.discount = discount;
    offer.fromDate = fromDate;
    offer.toDate = toDate;

    await offer.save();
  }

  res
    .status(200)
    .json(new ApiResponse(200, offer, "Special offer updated successfully"));
});
