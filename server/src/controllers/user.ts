import { Request, Response } from "express";
import { dataBase, userCollection } from "../index";
import { ObjectId } from "mongodb";
import { ResponseJson } from "../utils/reqAndResUtil"
import { encryptPasswords, comparePasswords } from "../helpers/mangePassword"
import { generateAuthToken } from "../helpers/manageTokens"
import { CustomRequest } from "../middlewares/user"
// const userCollection = dataBase.collection("users");
// // we need to specify the explicitly "../index". Here the default is index.ts
// console.log(userCollection);

interface userDetails {
    _id: string;
    name?: string;
    email?: string;
    password?: string;
}

async function handleCreateUser(req: Request, res: Response) {
    const responseJson = new ResponseJson(req, res);
    try {
        const { name, email, password } = req.body;
        // get email
        if (!email) {
            return responseJson.customResponse(false, 400, "Invalid credentials. Please fill all the fields.");
        }

        // check if the user exists
        const result = await userCollection.findOne({ email });
        if (result) {
            return responseJson.customResponse(false, 409, "User already exists");
        } else {
            // validate user data
            if (!name || !password) {
                return responseJson.customResponse(false, 400, "Invalid credentials. Please fill all the fields.");
            }

            // encrypt password
            const hashedPassword = encryptPasswords(password);
            const data = { name, email, password: hashedPassword };

            const saveNewUser = await userCollection.insertOne(data);
            // send me all data except user password
            const newUser = await userCollection.findOne({ _id: new ObjectId(saveNewUser.insertedId) }, { projection: { password: 0 } });

            // generate token for user & send to client
            const authToken: string = generateAuthToken({
                _id: String(newUser?._id),
                email: newUser?.email
            },
                1 * 60 * 60 * 24 * 30 // no of seconds for 30 days
            )
            const responseData = { authToken, newUser }
            return responseJson.successResponse("User created successfully", responseData);
        }
    } catch (error: any) {
        responseJson.logError(error,);
        return responseJson.internalServerErrorResponse(error)
    }
}

async function handleUserLogin(req: Request, res: Response) {
    const responseJson = new ResponseJson(req, res);
    try {
        const { email, password } = req.body;
        // get email
        if (!email || !password) {
            return responseJson.customResponse(false, 400, "Invalid credentials. Please fill all the fields.");
        }
        // check if the user exists
        const findUser = await userCollection.findOne({ email});
        if (!findUser) {
            return responseJson.customResponse(false, 409, "user not found # email id does not exists")
        }

        const isPasswordMatched = comparePasswords(password, findUser.password);
        if (!isPasswordMatched) {
            return responseJson.customResponse(false, 400, "Password or email mismatch");
        }

        // generate token for user & send to client
        const authToken: string = generateAuthToken({
            _id: String(findUser._id),
            email: findUser.email
        })
        const sendUserDetails = {email: findUser.email, _id : findUser._id, name: findUser.name};
        return responseJson.successResponse("user log in", {authToken, user : sendUserDetails});
    } catch (error) {
        responseJson.logError(error);
        return responseJson.internalServerErrorResponse(error)
    }
}

async function handleDeleteUser(req: Request, res: Response) {
    // const userCollection = dataBase.collection("users");
    // console.log("collection", userCollection);
    const result = await userCollection.deleteOne({ name: "Satyanarayanan" });
    console.log(result);
    return res.json({
        message: "Hello World"
    });
}
const user = {
    name: "Satyanarayanan",
    email: "satya@gmail.com",
    password: "hello"
}
// here we are using custom request to get that bearer token
async function handleUpdateUser(req: CustomRequest, res: Response) {
    const responseJson = new ResponseJson(req, res);
    try {
        // console.log(req.userAuthDetails);
        // console.log(req.body);
        // const userCollection = dataBase.collection("users");
        // const filter = { _id: new ObjectId(updatedUserDetails._id) };
        // const { _id, ...userUpdate } = updatedUserDetails;
        // const update = { $set: userUpdate };
        // const result = await userCollection.updateOne(filter, update);

        // console.log(result);
        // console.log(req.bearerToken);

        return res.json({
            message: "User updated successfully",
            token: req.bearerToken
        });
        // const result = await userCollection.updateOne(filter,update)
    } catch (error) {
        console.log(error);
        return responseJson.internalServerErrorResponse(error)
    }
}

export { handleCreateUser, handleUserLogin, handleDeleteUser, handleUpdateUser, userDetails }