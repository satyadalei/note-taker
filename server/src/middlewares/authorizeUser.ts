import { Request, Response, NextFunction } from "express";
import {ResponseJson} from "../utils/reqAndResUtil";
import {verifyAuthToken, TokenVerificationData} from "../helpers/manageTokens";


let secretKey: string;
if (!process.env.AUTH_TOKEN_SECRET_KEY) {
    throw new Error("AUTH_TOKEN_SECRET_KEY is not available in .env file")
} else {
    secretKey = process.env.AUTH_TOKEN_SECRET_KEY;
}
// Extend the Request type to include a custom property 'bearerToken'
interface CustomRequest extends Request {
    bearerToken?: string;
    userAuthDetails?: {
        _id: string;
        email?: string;
    }
}

function authorizeUser(req: CustomRequest, res: Response, next: NextFunction) {
    const newResponse : ResponseJson = new ResponseJson(req,res);
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;
   
    // Check if the header exists and starts with 'Bearer '
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token after 'Bearer '
        const token = authHeader.substring('Bearer '.length);
        const userAuthDetails: TokenVerificationData = verifyAuthToken(token);
        // Attach the token to the request object for further processing
        // req.bearerToken = token;
        
        if (userAuthDetails.isVerified) {
            req.userAuthDetails = {_id: userAuthDetails.decodedData._id, email: userAuthDetails.decodedData.email};
            return next();
        }
        // user not authenticated
        return newResponse.unAuthorizedResponse();
    }else{
        return newResponse.unAuthorizedResponse();
    }
}

export { authorizeUser, CustomRequest }

