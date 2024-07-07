import { ApiError } from "./apiError";

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => res.status(err.statusCode || 500).json(
                new ApiError(err.statusCode || 500, err.message)
            ));
    }
}

export { asyncHandler };