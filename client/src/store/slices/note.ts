import { createSlice } from '@reduxjs/toolkit';
import { NoteContent } from "../../../src/components/note/UsersAllNote"


function getUserNotesAvailableInLocal(): Array<NoteContent> | null {
    const allUserNotes = localStorage.getItem("allUserNotes");
    if (allUserNotes !== null) {
        return JSON.parse(allUserNotes);
    }
    return null;
}

export const noteSlice = createSlice({
    name: "note",
    initialState: getUserNotesAvailableInLocal(),
    reducers: {
        setNote: (state, action) => {
            return action.payload
        }
    }
})

export const { setNote } = noteSlice.actions;
export default noteSlice.reducer;