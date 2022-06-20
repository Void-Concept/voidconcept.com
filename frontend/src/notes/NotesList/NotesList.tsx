import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from '../../components/Link';
import { useAsyncEffect } from '../../hooks';
import { Notes, NotesDao } from '../NotesDao';
import './NotesList.css';

export type NotesListProps = {
    notesDao: NotesDao
}

export const NotesList = ({ notesDao }: NotesListProps) => {
    const history = useHistory();
    const [notesList, setNotesList] = useState<Notes[]>([])
    const [disable, setDisable] = useState(false)

    useAsyncEffect(async () => {
        setNotesList(await notesDao.list())
    }, [])

    const createNote = async () => {
        setDisable(true)
        const newNote = await notesDao.create("")
        history.push(`/notes/${newNote.id}`)
    }

    return (
        <div className='notes-list-container'>
            <h1>Notes List</h1>
            <button className='notes-create-button' onClick={createNote} disabled={disable}>Create note</button>
            {notesList
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(notes => 
                    <div key={notes.id} ><Link href={`/notes/${notes.id}`} disabled={disable}>{notes.name || "<untitled>"}</Link></div>
                )
            }
        </div>
    )
}
