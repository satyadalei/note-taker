import { useEffect } from "react"
import { fetchNotes, AllNoteReturnData } from "../../services/note"
import GeneralCard from "../card/GeneralCard";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setNote } from "../../store/slices/note"

interface NoteContent {
    _id?: string;
    authorId?: string;
    content?: string;
    title?: string;
    created?: string;
    createdAt?: string
}

const UsersAllNote = () => {

    // const [notes, setNotes] = useState<NoteContent[] | null>();
    const notes = useAppSelector((state) => state.note);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (notes === null) {
            // fetch note only if user do not have notes in redux states
            fetchNotes()
                .then((result: AllNoteReturnData) => {
                    if (result.isSuccess && result.responseData !== null) {
                        const allNotes: Array<NoteContent> = result.responseData.data || [];
                        dispatch(setNote(allNotes))
                        return;
                    } else {
                        result.responseData !== null && window.alert(result.responseData.message.split("#"));
                    }
                })
        }
    }, [])

    return (
        <div className="pt-3" >
            <div className="flex flex-wrap pl-2 pr-2" >
                {
                    (notes !== null && notes.length !== 0) ? notes.map((note: NoteContent) => {
                        if (note === undefined || note === null) {
                            return;
                        }
                        return (
                            <GeneralCard key={note._id} className="cursor-pointer m-1 mr-2 " title={note?.title} content={note?.content} />
                        )
                    }) : <h1>No notes found</h1>
                }
            </div>
        </div>
    )
}

export default UsersAllNote
export type { NoteContent }