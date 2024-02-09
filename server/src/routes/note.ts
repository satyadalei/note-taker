import express from "express";
const router = express.Router();
import { Request, Response, NextFunction } from "express";
import { authorizeUser, CustomRequest } from "../middlewares/user";
import { handleCreateNote, handleFetchAllNotes, handleDeleteNote, handleUpdateNote } from "../controllers/note";
import { isNoteAuthor, isValidObjectIdInParam } from "../middlewares/note"


router
    .route("/createNote")
    .post(authorizeUser, (req: CustomRequest, res: Response) => {
        handleCreateNote(req, res);
    })

router
    .route("/fetchAllNote")
    .get(authorizeUser, (req: CustomRequest, res: Response) => {
        handleFetchAllNotes(req, res);
    })

router
    .route("/deleteNote")
    .delete(authorizeUser, isValidObjectIdInParam, isNoteAuthor, (req: CustomRequest, res: Response) => {
        handleDeleteNote(req, res);
    })

/* Update an exiting note */
router
    .route("/updateNote")
    .put(authorizeUser,isValidObjectIdInParam, isNoteAuthor,(req: CustomRequest, res: Response) => {
        // this function handles CRUD. for updating note you need to pass _id (of note in req.body)
        handleUpdateNote(req, res);
    })
export default router   