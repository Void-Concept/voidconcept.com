import React, { useEffect, useState } from 'react';
import { Link } from '../../components/Link';
import { Notes, NotesDao } from '../NotesDao';

type NotesListProps = {
    notesDao: NotesDao
}

export const NotesList = ({ notesDao }: NotesListProps) => {
    const [notesList, setNotesList] = useState<Notes[]>([])

    useEffect(() => {
        const run = async () => {
            setNotesList(await notesDao.list())
        }
        run().catch(console.error)
    }, [])

    return (
        <div>
            <h1>Notes List</h1>
            {notesList.map(notes => <div key={notes.id} ><Link href={`/notes/${notes.id}`} >{notes.name}</Link></div>)}
        </div>
    )
}