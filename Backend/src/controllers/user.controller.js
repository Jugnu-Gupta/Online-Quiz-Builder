import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


const getRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ ValidateBeforeSave: false });

        return { refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    // check is all fields are given.
    if ([fullName, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, `All fields are required`);
    }

    // check if the user exists: email, username.
    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
        throw new ApiError(409, "User with email already exists");
    }

    const user = await User.create({
        fullName,
        email,
        password,
    });

    // check for user creation
    const createdUser = await User.findById(user._id)
        ?.select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, null, "User registered successfully.")
    )
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password");
    }

    const { refreshToken } = await getRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id)
        ?.select("-password -refreshToken");
    if (!loggedInUser) {
        throw new ApiError(500, "Something went wrong while logging in the user");
    }

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user: loggedInUser, token: refreshToken },
                "User logged in successful")
        );
});


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: "" }
    });

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User logged out successfully"));
});


const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, { user: req?.user }, "User found")
    );
});


export { registerUser, loginUser, logoutUser, getCurrentUser };