import { Request, Response } from "express";
import { ResponseJson } from "../utils/reqAndResUtil"
import { dataBase, noteCollection } from "../index";
import { ObjectId } from "mongodb";
import { CustomRequest } from "../middlewares/user";

/* this function is mainly responsible for creating a note entry but based on behaviors of users while creating a new note entry it also performs Update & Delete operations. This is used because of autosave feature in frontend */
async function handleCreateNote(req: CustomRequest, res: Response) {
    const responseJson = new ResponseJson(req, res);
    try {

        let { title, content, _id, createdAt} = req.body;
        
        if (!createdAt) {
            createdAt = new Date();
        }
        if (!title && !content) {
            return responseJson.customResponse(false, 400, "There must be a title or content to create a note.");
        }

        if (!_id || _id === null) {
            // create a new note
            const newNote = await noteCollection.insertOne({
                authorId : new ObjectId(req.userAuthDetails?._id) ,
                title,
                content,
                createdAt 
            });
            const note = await noteCollection.findOne({ _id: new ObjectId(newNote.insertedId) });
            return responseJson.successResponse("Note created successfully", note);
        } else {
            // update an existing note
            // if title is "" && content is "" (empty string) then delete it

            // first check if the note _id exists
            const findNote = await noteCollection.findOne({ _id: new ObjectId(_id) });

            //note does not exist
            if (!findNote) {
                // title, contents are not empty
                if (title !== "" || content !== "") {
                    // create a note
                    const newNote = await noteCollection.insertOne({
                        authorId : new ObjectId(req.userAuthDetails?._id) ,
                        title,
                        content,
                        createdAt 
                    });

                    const note = await noteCollection.findOne({ _id: new ObjectId(newNote.insertedId) });                    
                    return responseJson.successResponse("Note created successfully", note);
                }
                // If title and content are both empty
                return responseJson.successResponse("Note updated successfully", null);
            }
            
            // checks whether note belongs to correct owner
            if (req.userAuthDetails?._id !== findNote.authorId.toString()) {
                return responseJson.customResponse(false,400, "Unauthorized access to note");
            }

            // note found but title & content are empty 
            if (title === "" && content === "") {
                //delete note
                const deleteNote = await noteCollection.deleteOne({ _id: new ObjectId(findNote._id) });
                return responseJson.successResponse("Note deleted successfully", null);
            }

            // note found but any one between title or content or both is not empty
            const updateNote = await noteCollection.updateOne({ _id: new ObjectId(findNote._id) }, { $set: { content, title } });
            const note = await noteCollection.findOne({ _id: new ObjectId(findNote._id) });
            return responseJson.successResponse("Note updated successfully", note);
        }
    } catch (error) {
        responseJson.logError(error, req.method, req.path);
        responseJson.internalServerErrorResponse();
    }
}


async function handleUpdateNote(req: CustomRequest, res: Response) {
    const responseJson = new ResponseJson(req, res);
    try {
       const {_id, title, content} = req.body;
       if (!_id || _id === null) {
           return responseJson.customResponse(false, 400, "Invalid credentials. _id is missing in body.");
       }
       if (!title && !content) {
         return responseJson.customResponse(false, 400, "Invalid credentials. At least title or content should be provided.");
       }
       const findNote = await noteCollection.findOne({ _id: new ObjectId(_id) });
       if (!findNote) {
           return responseJson.customResponse(false, 400, "Note not found.");
       }
       // checking of whether note belongs to correct owner is done in the middleware
       // so update

       await noteCollection.updateOne({ _id: new ObjectId(_id)},{
        $set: {
            title: title || "",
            content: content || ""
        }
       })
       const note = await noteCollection.findOne({ _id: new ObjectId(_id) });
       responseJson.successResponse("Note updated successfully", note);

    } catch (error) {
        responseJson.logError(error, req.method, req.path);
        responseJson.internalServerErrorResponse();
    }
}


async function handleDeleteNote(req: CustomRequest, res: Response) {
    const responseJson = new ResponseJson(req, res);
    try {
      const {noteId} = req.query;
      if (!noteId) {
        return responseJson.customResponse(false, 400, "Note id is missing");
      }
      await noteCollection.deleteOne({_id: new ObjectId(noteId as string)});
      responseJson.successResponse("Note deleted successfully");
    } catch (error) {
        responseJson.logError(error, req.method, req.path);
        responseJson.internalServerErrorResponse();
    }
}

async function handleFetchAllNotes(req: CustomRequest, res: Response){
    const responseJson = new ResponseJson(req, res);
    try {        
        const allNotes = await noteCollection.find({authorId: new ObjectId(req.userAuthDetails?._id)}).toArray();
        return responseJson.successResponse("All notes sent successfully", allNotes);
    } catch (error) {
        responseJson.logError(error, req.method, req.path);
        responseJson.internalServerErrorResponse();
    }
}

export { handleCreateNote , handleUpdateNote, handleDeleteNote, handleFetchAllNotes}
