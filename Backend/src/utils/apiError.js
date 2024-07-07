class ApiError {
    constructor(
        statusCode,
        message = "Something went Wrong",
        errors = [],
        stack = "",
    ) {
        this.message = message;
        this.statusCode = statusCode
        this.data = null
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };