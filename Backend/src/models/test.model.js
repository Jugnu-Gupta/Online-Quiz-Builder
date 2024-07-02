import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        duration: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export const Test = mongoose.model("Question", testSchema);