import { asyncHandler } from "../utils/asyncHandler.js";
import { Feedback } from "../models/feedback.model.js";
import { Test } from "../models/test.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";


const getFeedbacks = asyncHandler(async (req, res) => {
    console.log("req.user", req.user);

    const feedback = await Feedback.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.user._id) } },
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
                        // questionId: "$answers.questionId",
                        selectedOption: "$answers.selectedOption",
                        questionDetails: "$answers.questionDetails"
                    }
                }
            }
        },
        {
            $lookup: {
                from: "tests",
                localField: "testId",
                foreignField: "_id",
                as: "testDetails"
            }
        },
        { $addFields: { testName: { $arrayElemAt: ["$testDetails.name", 0] } } },
        { $sort: { createdAt: -1 } },
        {
            $project: {
                testName: 1,
                score: 1,
                correctAnswers: 1,
                incorrectAnswers: 1,
                totalQuestions: 1,
                duration: 1,
            }
        },
    ]);

    console.log("feedback", feedback);
    if (!feedback) {
        throw new ApiError(404, "feedback does not exists");
    }

    return res.status(200).json(
        new ApiResponse(200, feedback, "feedback fetched successfully")
    );
});

const analyseFeedback = (feedback) => {
    let score = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let totalQuestions = feedback?.answers.length;

    feedback?.answers.forEach((answer) => {
        const selectedOption = answer.selectedOption;
        const question = answer.question;

        const isCorrect = true;
        for (let i = 0; i < question.options.length; i++) {
            if (selectedOption.includes(question.options[i].option) !== question.options[i].isCorrect) {
                isCorrect = false;
                break;
            }
        }

        if (isCorrect) {
            score += 1;
            correctAnswers += 1;
        } else {
            incorrectAnswers += 1;
        }
    });
    return { score, correctAnswers, incorrectAnswers, totalQuestions };
};

const addFeedback = asyncHandler(async (req, res) => {
    const { feedback } = req.body; // give response feedback carefully i.e answers.
    if (!feedback) {
        throw new ApiError(404, "feedback is missing");
    }

    const { score, correctAnswers, incorrectAnswers, totalQuestions }
        = analyseFeedback(feedback);
    // answers: [
    //     {
    //         questionId: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "Question",
    //         },
    //         selectedOption: [
    //             {
    //                 type: String,
    //                 unique: true,
    //             }
    //         ],
    //     },
    // ],

    const newFeedback = await Feedback.create({
        testId: feedback.testId,
        userId: req.user._id,
        answers: feedback.answers.map((answer) => {
            return {
                questionId: answer.questionId,
                selectedOption: answer.selectedOption,
            };
        }),
        score,
        totalQuestions,
        correctAnswers,
        incorrectAnswers,
        duration: feedback.duration,
    });


    console.log("feedback", feedback);
    if (!feedback?.length) {
        throw new ApiError(404, "feedback does not exists");
    }

    return res.status(200).json(
        new ApiResponse(200, test, "feedback fetched successfully")
    );
});

export { getFeedbacks, addFeedback };
