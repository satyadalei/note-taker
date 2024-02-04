import express from "express";
const router = express.Router();
import { Request, Response, NextFunction } from "express";
import { authorizeUser, CustomRequest } from "../middlewares/authorizeUser";
import { handleCreateNote } from "../controllers/note";

router
    .route("/createNote")
    .post(authorizeUser, (req : CustomRequest, res : Response) => {
        handleCreateNote(req, res);
    })

router
   .route("/deleteNote")
   .delete(authorizeUser, (req : CustomRequest, res : Response) =>{
       
   })    

export default router   