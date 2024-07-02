import { asyncHandler } from "../utils/asyncHandler.js";
import { Feedback } from "../models/feedback.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


const getFeedbacks = asyncHandler(async (req, res) => {
    const feedback = await Feedback.aggregate([
        { $unwind: "$answers" },
        {
            $lookup: {
                from: "questions",
                localField: "answers.questionId",
                foreignField: "_id",
                as: "questionDetails"
            }
        },
        {
            $addFields: {
                "answers.questionDetails": { $arrayElemAt: ["$questionDetails", 0] }
            }
        },
        {
            $group: {
                _id: "$_id",
                testId: { $first: "$testId" },
                userId: { $first: "$userId" },
                score: { $first: "$score" },
                totalQuestions: { $first: "$totalQuestions" },
                correctAnswers: { $first: "$correctAnswers" },
                incorrectAnswers: { $first: "$incorrectAnswers" },
                duration: { $first: "$duration" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                answers: {
                    $push: {
                        questionId: "$answers.questionId",
                        selectedOption: "$answers.selectedOption",
                        questionDetails: "$answers.questionDetails"
                    }
                }
            }
        }
    ]);

    console.log("feedback", feedback);
    if (!feedback?.length) {
        throw new ApiError(404, "feedback does not exists");
    }

    return res.status(200).json(
        new ApiResponse(200, test, "feedback fetched successfully")
    );
});

export { getFeedbacks };
