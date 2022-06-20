import React, { ChangeEvent, useState } from 'react';
import { Link } from '../../components/Link';
import { useAsyncEffect, useAsyncReducer } from '../../hooks';
import { NotesDao } from '../NotesDao';
import './NotesList.css';
import { notesCreateAction, notesListReducer, notesLoadAction } from './NotesListReducer';

type NotesCreateProps = {
    onCreateNoteSubmit: (name: string) => void
}

const NotesCreate = ({ onCreateNoteSubmit }: NotesCreateProps) => {
    const [name, setName] = useState("")

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const onButtonClick = () => {
        if (!!name) {
            onCreateNoteSubmit(name)
            setName("")
        }
    }

    return (
        <div className='notes-list-create-banner'>
            <input id='notes-create-input' type='text' placeholder='New note name...' onChange={onInputChange} value={name}/>
            <button id='notes-create-button' onClick={onButtonClick}>Create</button>
        </div>
    )
}


export type NotesListProps = {
    notesDao: NotesDao
}

export const NotesList = ({ notesDao }: NotesListProps) => {
    const [notesList, dispatch] = useAsyncReducer(notesListReducer(notesDao), [])

    useAsyncEffect(async () => {
        dispatch(notesLoadAction())
    }, [])

    const onCreateNoteSubmit = (name: string) => {
        dispatch(notesCreateAction(name))
    }

    return (
        <div className='notes-list-container'>
            <h1>Notes List</h1>
            <NotesCreate onCreateNoteSubmit={onCreateNoteSubmit}/>
            {notesList.map(notes => 
                <div key={notes.id} ><Link href={`/notes/${notes.id}`} >{notes.name}</Link></div>
            )}
        </div>
    )
}
