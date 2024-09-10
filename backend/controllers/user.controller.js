import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    throw new ApiError(400, "Please Provide All Fileds");
  }
  //check exisiting user
  const exisitingUser = await User.findOne({ email });
  if (exisitingUser) {
    throw new ApiError(409, "Email is already exist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  res
    .status(201)
    .json(new ApiResponse(201, null, "Registeration Success, please login"));
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    throw new ApiError(400, "Please Provide All Fields");
  }
  //check user is exist or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }
  //check password is correct or not
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }
  const token = generateTokenAndSetCookie(user._id, res);

  // Convert user document to plain JavaScript object and remove password
  const userObj = user.toObject();
  delete userObj.password;

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: userObj,
        token: token,
      },
      "Login Successfull"
    )
  );
});
