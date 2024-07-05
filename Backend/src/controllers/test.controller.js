import { asyncHandler } from "../utils/asyncHandler.js";
import { Test } from "../models/test.model.js";
import { Question } from "../models/question.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { isValidObjectId } from "mongoose";


const getTests = asyncHandler(async (req, res) => {
    const tests = await Test.find().populate("questions").sort({ createdAt: -1 });

    const testsData = tests.map((t) => {
        return {
            _id: t._id,
            name: t.name,
            duration: t.duration,
            questions: t.questions.map((q) => {
                return {
                    QNo: q.QNo,
                    description: q.description,
                    isMultipleCorrect: q.isMultipleCorrect,
                    options: q.options,
                };
            }),
        };
    });
    if (!testsData?.length) {
        throw new ApiError(404, "test does not exists");
    }

    return res.status(200).json(
        new ApiResponse(200, testsData, "test fetched successfully")
    );
});

const getTestById = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    if (!isValidObjectId(testId)) {
        throw new ApiError(400, "Invalid test id");
    }

    const test = await Test.findById(testId).populate("questions").select("-ownerId -__v -updatedAt -createdAt");

    const questions = test.questions.map((q) => {
        return {
            QNo: q.QNo,
            description: q.description,
            isMultipleCorrect: q.isMultipleCorrect,
            options: q.options,
        };
    });

    // console.log("test", test);
    if (!test) {
        throw new ApiError(404, "test does not exists");
    }

    return res.status(200).json(
        new ApiResponse(200, { name: test.name, duration: test.duration, questions }, "test fetched successfully")
    );
});


const addTest = asyncHandler(async (req, res) => {
    // console.log("test", req.body);
    const test = {
        description: req.body.description,
        duration: req.body.duration,
        questions: req.body.questions,
    };
    // console.log("test", test);


    if (!test) {
        throw new ApiError(404, "test is missing");
    }

    const newTest = await Test.create({
        ownerId: req.user._id,
        name: test.description,
        duration: test.duration,
    });
    // console.log("newTest", newTest);


    if (!newTest) {
        throw new ApiError(520, "test not created");
    }

    const addQuestions = await Question.insertMany(
        test.questions.map((question) => {
            return {
                QNo: question.QNo,
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

    const updateTest = await Test.findByIdAndUpdate(
        newTest._id,
        {
            $set: { questions: addQuestions.map((q) => q._id), }
        },
        { new: true }
    );
    if (!updateTest) {
        throw new ApiError(500, "Questions not added");
    }

    return res.status(200).json(
        new ApiResponse(200, { updateTest }, "Test created successfully")
    );
});

export { getTests, getTestById, addTest };