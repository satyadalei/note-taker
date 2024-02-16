import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { createNote, NoteReturnData } from "./../../services/note";
import { NoteContent } from "./UsersAllNote";
import { setNote } from "../../store/slices/note";
import { useAppDispatch } from "../../store/hooks";


export interface AddNote {
    title: string;
    content: string;
}

const NoteTakeInputBox = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentNoteId, setCurrentNoteId] = useState<null | string>(null);
    const [savedNote, setSavedNote] = useState<NoteContent | null>(null);
    const componentRef = useRef<HTMLDivElement>(null);
    const noteInputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<number | null>(null);// this will help clearing out previous setTimeout and assign new Timeout.

    const dispatch = useAppDispatch();
    const [noteInput, setNoteInput] = useState<AddNote>({
        title: "",
        content: ""
    });



    // let debounceNote : any ;
    const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue: string = e.target.value

        setNoteInput({
            ...noteInput,
            [e.target.name]: newValue
        })

        // Clear previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    // Trigger auto-save after the input changes (debounced)        
    useEffect(() => {
        if (currentNoteId !== null || noteInput.title !== "" || noteInput.content !== "") {
            timeoutRef.current = setTimeout(async () => {
                createNote(noteInput, currentNoteId).then((result: NoteReturnData) => {
                    if (result.isSuccess) {
                        setSavedNote(result.responseData.data)
                        // push that note to existing note list if data is not null (null incase of emmpty title & content)
                        if (result.responseData.data !== null) {
                            setCurrentNoteId(result.responseData.data._id);
                        }
                    } else {
                        window.alert(result.responseData.message.split("#")[0])
                    }
                })
            },800);
        }
    }, [noteInput])




    // whenever mouse is clicked outside of the component, then it automatically closes the expanded input box
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
                // First modify local storage note
                const usersAllNotes = localStorage.getItem("allUserNotes");
                if (usersAllNotes !== null) {
                    // Update local storage
                    // eslint-disable-next-line prefer-const
                    let allNotes: Array<NoteContent> = JSON.parse(usersAllNotes);

                    if (savedNote !== null) {
                        // if note is locally available then update content 
                        const desiredNote = allNotes.find(item => item._id === savedNote._id);
                        if (desiredNote) {
                            // note not then just modify the note  
                            desiredNote.content = noteInput.content;
                            desiredNote.title = noteInput.title;
                            localStorage.setItem("allUserNotes", JSON.stringify(allNotes));
                            dispatch(setNote(allNotes));
                        }else{
                            // note not found then just add new note  
                            allNotes.push(savedNote as NoteContent);
                            localStorage.setItem("allUserNotes", JSON.stringify(allNotes));
                            dispatch(setNote(allNotes));
                        }
                    }
                    setCurrentNoteId(null);
                    setNoteInput({
                        title: "",
                        content: ""
                    })
                }
                // Click occurred outside the component, collapse it
                setIsExpanded(false);
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [savedNote]);

    // this always puts focus on the content every time the add note is clicked
    useEffect(() => {
        if (isExpanded && noteInputRef.current) {
            noteInputRef.current.focus();
        }
    }, [isExpanded]);

    // Toggle the expanded state when the component is clicked
    const handleComponentClick = () => {
        if (isExpanded) {
            return
        }
        setIsExpanded((prev) => {
            return !prev
        });
    };

    return (
        <div className='flex items-center justify-center min-h-24' 
            onClick={handleComponentClick}
        >
            <div ref={componentRef} className='p-2 w-[65%] relative' >
                <input className={`border-2 outline-none absolute top-0 left-0 bg-transparent h-12 w-full pl-3 ${isExpanded ? "hidden" : "block"} `} type="text" placeholder="Enter your note here" />

                <div className={`${isExpanded ? "block border-2 " : "hidden"}`} >
                    <input value={noteInput.title} autoComplete='off' name='title' onChange={handleNoteChange} className='block m-2 outline-none w-full' type="text" placeholder='Title' />
                    <input value={noteInput.content} autoComplete='off' name='content' onChange={handleNoteChange} ref={noteInputRef} className='block m-2 outline-none w-full' type="text" placeholder='Write your note...' />
                </div>
            </div>
        </div>
    )
}

export default NoteTakeInputBox