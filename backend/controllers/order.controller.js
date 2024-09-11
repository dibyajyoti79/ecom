import Stripe from "stripe";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createCheckoutSession = asyncHandler(async (req, res, next) => {
  const { products } = req.body;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Create a checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: products.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    discounts: products.length > 1 ? [{ coupon: "JhXmTnJE" }] : [],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    customer_email: req.user.email,
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/failed`,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { sessionId: session.id },
        "Checkout session created successfully"
      )
    );
});
