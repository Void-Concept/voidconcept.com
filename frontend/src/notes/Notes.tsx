import React, { useEffect, useState } from 'react';
import Editor from "rich-markdown-editor";
import './Notes.css';

type NotesProps = {

}

export const Notes = ({ }: NotesProps) => {
    const [notes, setNotes] = useState("")
    const [working, setWorking] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log(notes)
            setWorking(false)
        }, 750)
        return () => clearTimeout(timeout)
    }, [notes])

    const onEditorChange = (value: () => string) => {
        setWorking(true)
        setNotes(value())
    }

    return (
        <div className={"notes-container"}>
            {working ? "WORKING" : "SAVED"}
            <Editor onChange={onEditorChange}/>
        </div>
    )
}
