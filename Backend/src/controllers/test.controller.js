import { asyncHandler } from "../utils/asyncHandler.js";
import { Test } from "../models/test.model.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


const getTests = asyncHandler(async (req, res) => {
    const { userName } = req.params;
    if (!userName) {
        throw new ApiError(404, "Username is missing");
    }

    const test = await Test.aggregate([
        { $lookup: { from: "Question", localField: "_id", foreignField: "testId", as: "questions" } },
    ]);

    console.log("test", test);
    if (!test?.length) {
        throw new ApiError(404, "test does not exists");
    }

    return res.status(200).json(
        new ApiResponse(200, test, "test fetched successfully")
    );
});

export { getTests };