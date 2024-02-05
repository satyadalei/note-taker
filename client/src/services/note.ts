/* All CRUD related functions related Notes */
import { AddNote } from "../components/note/NoteTakeInputBox";

async function createNote(note:AddNote){
  console.log(note);
  try {
    // call API to create
  } catch (error) {
    //log error & return error
  }
}

export {createNote}