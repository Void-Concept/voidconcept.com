import React, { ChangeEvent, useEffect, useState } from 'react';
import Editor from "rich-markdown-editor";
import { useRouteMatch } from 'react-router';
import ContentSaveIcon from "mdi-react/ContentSaveOutlineIcon";
import ContentSaveEditIcon from "mdi-react/ContentSaveEditOutlineIcon";
import ContentSaveMoveIcon from "mdi-react/ContentSaveMoveOutlineIcon";
import ContentSaveOffIcon from "mdi-react/ContentSaveOffOutlineIcon";
import { Notes, NotesDao } from '../NotesDao';
import './NotesEditor.css';
import { MdiReactIconProps } from 'mdi-react';
import { useAsyncEffect } from '../../hooks';
import { extractErrorMessage } from '../../helpers';

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

    useAsyncEffect(async () => {
        try {
            const initialNotes = await notesDao.get(match.params.id!)
            setNotes(initialNotes)
            setLoading(false)
        } catch (error) {
            setError(extractErrorMessage(error))
            setLoading(false)
        }            
    }, [])

    if (loading || !notes) return <span>loading...</span>
    if (error) return <span>Error: {error}</span>
    return (
        <NotesEditorLoaded initialNotes={notes} notesDao={notesDao} />
    )
}

type WorkingState = "WORKING" | "SAVING" | "SAVED" | "SAVE_ERROR"

type WorkingStateIconProps = MdiReactIconProps & {
    state: WorkingState
}
const WorkingStateIcon = ({state, ...iconProps}: WorkingStateIconProps) => {
    switch (state) {
        case "WORKING":
            return <ContentSaveEditIcon {...iconProps}/>
        case "SAVING":
            return <ContentSaveMoveIcon {...iconProps}/>
        case "SAVED":
            return <ContentSaveIcon {...iconProps}/>
        case "SAVE_ERROR":
            return <ContentSaveOffIcon {...iconProps}/>
    }
}

type NotesLoadedProps = {
    initialNotes: Notes
} & NotesProps

const NotesEditorLoaded = ({ notesDao, initialNotes }: NotesLoadedProps) => {
    const [firstLoad, setFirstLoad] = useState(true)
    const [notes, setNotes] = useState<Notes>(initialNotes)
    const [working, setWorking] = useState<WorkingState>("SAVED")
    const [readOnly, setReadOnly] = useState(false)

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
                    setReadOnly(true)
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

    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setWorking("WORKING")
        const newName = event.target.value
        const newNotes = {
            ...notes,
            name: newName
        }
        setNotes(newNotes)
    }

    return (
        <div className={"notes-container"}>
            <input className="notes-title-input" type='text' value={notes.name} placeholder={"<untitled>"} onChange={onTitleChange}/>
            <WorkingStateIcon className='notes-working-indicator' state={working}/>
            <Editor readOnly={readOnly} onChange={onEditorChange} defaultValue={notes.notes}/>
        </div>
    )
}