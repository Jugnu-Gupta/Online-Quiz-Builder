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


const addTest = asyncHandler(async (req, res) => {
    const { test } = req.body;

    if (!test) {
        throw new ApiError(404, "test is missing");
    }

    const newTest = await Test.create({
        ownerId: user._id,
        name: test.description,
        duration: test.duration,
    });

    if (!newTest) {
        throw new ApiError(500, "test not created");
    }

    const addQuestions = await Question.insertMany(
        test.questions.map((question) => {
            return {
                testId: newTest._id,
                description: question.text,
                isMultipleCorrect: question.isMultipleCorrect,
                options: question.options.map((option) => {
                    return {
                        option: option.text,
                        isCorrect: option.isCorrect,
                    };
                }),
            };
        })
    );
    if (!addQuestions) {
        throw new ApiError(500, "Questions not added");
    }

    return res.status(200).json(
        new ApiResponse(200, { test, addQuestions }, "Test created successfully")
    );
});

export { getTests, addTest };