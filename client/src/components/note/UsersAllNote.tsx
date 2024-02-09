import { useEffect, useState } from "react"
import {fetchNotes, AllNoteReturnData} from "../../services/note"

interface NoteContent {
    _id?: string;
    authorId?: string;
    content?: string;
    title?: string;
    created?: string;
    createdAt?: string
}

const UsersAllNote = () => {
    const [notes, setNotes] = useState<NoteContent[]>([]);

    useEffect(() => {        
        fetchNotes()
        .then((result : AllNoteReturnData)=>{
            if(result.isSuccess){
                const allNotes : Array<NoteContent> = result.responseData.data || [];
                return setNotes(() => {
                   return [ ...allNotes];
                });
            }
            window.alert(result.responseData.message.split("#"));
        })
    },[])   

    return (
        <div>
            <h1>Users All Note</h1>
            {
                notes.map((note: NoteContent) => {
                    return (
                        <div key={note._id}>
                            <h2>{note?.title}</h2>
                            <p>{note?.content}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UsersAllNote