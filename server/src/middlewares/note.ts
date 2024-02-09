import { ObjectId } from "mongodb"
import { NextFunction, Request, Response } from "express"
import { CustomRequest } from "./user"
import { ResponseJson } from "../utils/reqAndResUtil";
import { noteCollection } from "..";


/*
There middlewares are helpful for operating any CRUD operations related notes along with checking object id
 - Check if the note exists
 - Check if the note belongs to correct user
 - Is the object id sent over params is it a valid mongodb object id
 */


function isValidObjectIdInParam(req: CustomRequest, res: Response, next: NextFunction) {
    const responseJson: ResponseJson = new ResponseJson(req, res);
    try {
        const noteId = req.query.noteId || req.body._id;
        if (!noteId) {
            return responseJson.customResponse(false, 400, "No note id in query or body param", null)
        }
        if (ObjectId.isValid(noteId as string)) {
            return next();
        }
        responseJson.customResponse(false, 400, "Invalid note id", null)
    } catch (error) {
        responseJson.logError(error, req.method, req.path);
        return responseJson.internalServerErrorResponse();
    }
}

/* This function can be  */
// function isValidObjectIdInBody(req: CustomRequest, res: Response, next: NextFunction) {
//     const responseJson: ResponseJson = new ResponseJson(req, res);
//     try {
//         const objectId = req.body._id;
//         if (!objectId) {
//             return responseJson.customResponse(false, 400, "No note id in body", null)
//         }
//         if (ObjectId.isValid(objectId)) {
//             return next()
//         }
//         return responseJson.customResponse(false, 400, "Invalid note id", null)
//     } catch (error) {
//         responseJson.logError(error, req.method, req.path);
//         return responseJson.internalServerErrorResponse();
//     }
// }

// this middleware is meant to be used after authorization middleware & isValidObjectIdInParam middleware so that there is always noteId or (_id) exists in either request body or request query parameters
async function isNoteAuthor(req: CustomRequest, res: Response, next: NextFunction) {
    const responseJson: ResponseJson = new ResponseJson(req, res);
    try {
        const noteId = req.query.noteId || req.body._id;
        const userId = req.userAuthDetails?._id;

        const findNote = await noteCollection.findOne({ _id: new ObjectId(noteId as string) });
        if (!findNote) {
            return responseJson.customResponse(false, 404, "Note not found", null)
        }
        if (findNote.authorId.toString() === userId) {
            return next();
        }
        responseJson.customResponse(false, 400, "Unauthorized access to note # You are note author of the note", null)
    } catch (error) {
        responseJson.logError(error, req.method, req.path);
        return responseJson.internalServerErrorResponse();
    }
}

export { 
    isValidObjectIdInParam, 
    isNoteAuthor, 
    // isValidObjectIdInBody 
}