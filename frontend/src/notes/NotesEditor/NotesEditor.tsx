import React, { useEffect, useState } from 'react';
import Editor from "rich-markdown-editor";
import { useRouteMatch } from 'react-router';
import { Notes, NotesDao } from '../NotesDao';
import './NotesEditor.css';

type NotesEditorParams = {
    id?: string
}

type NotesProps = {
    notesDao: NotesDao
}

export const NotesEditor = ({ notesDao }: NotesProps) => {
    const match = useRouteMatch<NotesEditorParams>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notes, setNotes] = useState<Notes | undefined>()

    useEffect(() => {
        const run = async () => {
            const initialNotes = await notesDao.get(match.params.id!)
            setNotes(initialNotes)
            setLoading(false)
        }
        run().catch((error) => {
            setError(error.message)
            setLoading(false)
        })
    }, [])

    if (loading || !notes) return <span>loading...</span>
    if (error) return <span>Error: {error}</span>
    return (
        <NotesEditorLoaded initialNotes={notes} notesDao={notesDao} />
    )
}

type NotesLoadedProps = {
    initialNotes: Notes
} & NotesProps

type WorkingState = "WORKING" | "SAVING" | "SAVED" | "SAVE_ERROR"

const NotesEditorLoaded = ({ notesDao, initialNotes }: NotesLoadedProps) => {
    const [firstLoad, setFirstLoad] = useState(true)
    const [notes, setNotes] = useState<Notes>(initialNotes)
    const [working, setWorking] = useState<WorkingState>("SAVED")

    useEffect(() => {
        if (firstLoad) return setFirstLoad(false) //skip first render
        const timeout = setTimeout(() => {
            const run = async () => {
                try {
                    setWorking("SAVING")
                    await notesDao.update(notes)
                    setWorking("SAVED")
                } catch (error) {
                    console.error(error)
                    setWorking("SAVE_ERROR")
                }
            }
            run().catch(console.error)
        }, 750)
        return () => clearTimeout(timeout)
    }, [notes])

    const onEditorChange = (value: () => string) => {
        console.log("onEditorChange")
        setWorking("WORKING")
        const newNotes = {
            ...notes,
            notes: value()
        }
        setNotes(newNotes)
    }

    return (
        <div className={"notes-container"}>
            {working}
            <Editor onChange={onEditorChange} defaultValue={notes.notes}/>
        </div>
    )
}