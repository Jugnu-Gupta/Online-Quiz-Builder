import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        isMultipleCorrect: {
            type: Boolean,
            required: true,
        },
        options: [
            {
                option: {
                    type: String,
                    required: true,
                    unique: true,
                },
                isCorrect: {
                    type: Boolean,
                    required: true,
                },
            },
        ],
        testId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
        },
    },
    { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);