import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config()


interface UntokenData {
    _id: string;
    email: string;
    iat?: number; // in seconds
    exp?: number; // in seconds
}
interface TokenVerificationData {
    isVerified: boolean;
    decodedData: UntokenData
}
// console.log(process.env.AUTH_TOKEN_SECRET_KEY);

let secretKey: string;
if (!process.env.AUTH_TOKEN_SECRET_KEY) {
    throw new Error("AUTH_TOKEN_SECRET_KEY is not available in .env file")
} else {
    secretKey = process.env.AUTH_TOKEN_SECRET_KEY;
}

function generateAuthToken(dataObject: UntokenData, expireTime: number): string {
    // expireTime is in seconds
    return jwt.sign(dataObject, secretKey, { expiresIn: expireTime })
}

// It verifies users bearer token before allowing them to perform any protected CRUD operations & returns an object containing verification status & user information
function verifyAuthToken(token: string): TokenVerificationData {
    const initialValues: TokenVerificationData = { isVerified: false, decodedData: { _id: "", email: "" } };
    try {
        const decoded = jwt.verify(token, secretKey) as UntokenData;

        if (decoded.exp !== undefined && Math.floor(new Date().getTime() / 1000) > decoded.exp) {
            return initialValues;
        }

        // authorized
        return { isVerified: true, decodedData: decoded };
    } catch (error) {
        return initialValues;
    }
}

export { generateAuthToken, verifyAuthToken, TokenVerificationData }

