import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// controller to build a healthcheck response that simply 
// returns the OK status as json with a message
const healthCheck = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, null, "OK")
    );
})


export { healthCheck };