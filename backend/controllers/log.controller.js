import Log from "../models/log.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllLogs = asyncHandler(async (req, res, next) => {
  const logs = await Log.find({}).populate("user", "name _id");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalLogs: logs.length, logs },
        "Logs fetched successfully"
      )
    );
});
