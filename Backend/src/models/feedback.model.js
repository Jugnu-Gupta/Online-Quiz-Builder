import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        testId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        answers: [
            {
                questionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Question",
                },
                selectedOption: [
                    {
                        type: String,
                        unique: true,
                    }
                ],
            },
        ],
        score: {
            type: Number,
            required: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
        correctAnswers: {
            type: Number,
            required: true,
        },
        incorrectAnswers: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);