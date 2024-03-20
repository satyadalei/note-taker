/* All CRUD related functions related Notes */
import { AddNote } from "../components/note/NoteTakeInputBox";
import apiInstance1 from "../services/axiosInstance";
import { CommonAPIResponseData, CommonReturnData } from "../services/user";

interface NoteResponse extends CommonAPIResponseData {
  data: Note;
}

interface Note {
  _id: string;
  authorId: string;
  content: string;
  title: string;
  created: string;
  createdAt: string;
}

interface NoteReturnData extends CommonReturnData {
  responseData: NoteResponse;
}

interface AllNoteResponseData extends CommonAPIResponseData {
  data: Array<Note> | null;
}
interface AllNoteReturnData extends CommonReturnData {
  responseData: AllNoteResponseData | null;
}

async function createNote(note: AddNote, _id: string | null) {
  return apiInstance1
    .post("/note/createNote", {
      _id: _id,
      title: note.title,
      content: note.content,
    })
    .then((response) => {
      const { data } = response;
      const responseData: NoteResponse = data;
      const finalData: NoteReturnData = { isSuccess: true, responseData };
      return finalData;
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response;
      const responseData: NoteResponse = data;
      const finalData: NoteReturnData = { isSuccess: false, responseData };
      return finalData;
    });
}

async function fetchNotes() {
  const allUserNotes = localStorage.getItem("allUserNotes");

  if (allUserNotes !== null) {
    const data = JSON.parse(allUserNotes);
    const responseData: AllNoteResponseData = {
      success: true,
      message: "notes retrieved from localStorage successfully",
      data: data,
    };
    return { isSuccess: true, responseData: responseData };
  }

  return apiInstance1
    .get("/note/fetchAllNote")
    .then((result) => {
      const responseData: AllNoteResponseData = result.data;
      localStorage.setItem("allUserNotes", JSON.stringify(result.data.data));
      const finalData: AllNoteReturnData = { isSuccess: true, responseData };
      return finalData;
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response;
      const responseData: AllNoteResponseData = data;
      const finalData: AllNoteReturnData = { isSuccess: true, responseData };
      return finalData;
    });
}

export { createNote, fetchNotes };
export type { NoteReturnData, AllNoteReturnData, Note };
