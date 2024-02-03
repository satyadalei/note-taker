import { useState, useEffect, useRef, ChangeEvent } from 'react';

interface AddNote {
    id?: string | null
    title: string;
    content: string;
}

const NoteTakeInputBox = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const noteInputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<number | null>(null);// this will help clearing out previous setTimeout and assign new Timeout.

    

    const [noteInput, setNoteInput] = useState<AddNote>({
        id: null,
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

        // Trigger auto-save after the input changes (debounced)
        timeoutRef.current = setTimeout(() => {
            console.log("----------------------------------------------------------------");
        }, 1000);
    }
  

    

    // whenever mouse is clicked outside of the component, then it automatically closes the expanded input box
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
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
    }, []);

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
        <div className='flex items-center justify-center pt-3' ref={componentRef}
            onClick={handleComponentClick}
        >
            <div className='p-2 w-[65%]  relative' >
                <input className={`border-2 outline-none absolute top-0 left-0 bg-transparent h-12 w-full pl-3 ${isExpanded ? "hidden" : "block"} `} type="text" placeholder="Enter your note here" />

                <div className={`${isExpanded ? "block border-2 " : "hidden"}`} >
                    <input value={noteInput.title} name='title' onChange={handleNoteChange} className='block m-2 outline-none w-full' type="text" placeholder='Title' />
                    <input value={noteInput.content} name='content' onChange={handleNoteChange} ref={noteInputRef} className='block m-2 outline-none w-full' type="text" placeholder='Write your note...' />
                </div>
            </div>
        </div>
    )
}

export default NoteTakeInputBox