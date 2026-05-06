import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from '../../components/Link';
import { useAsyncEffect } from '../../hooks';
import { Notes, NotesDao } from '../NotesDao';
import './NotesList.css';
import { path } from 'ramda';
import { exit } from 'node:process';

export type NotesListProps = {
    notesDao: NotesDao
}

type NotesListGroup = {
    path: string
    notes: Notes[]
    subDirectory?: NotesListGroup[],
}

export const NotesList = ({ notesDao }: NotesListProps) => {
    const history = useHistory();
    const [notesList, setNotesList] = useState<Notes[]>([])
    const [disable, setDisable] = useState(false)

    useAsyncEffect(async () => {
        setNotesList(await notesDao.list())
    }, [])

    const groupedNotes: NotesListGroup[] = useMemo(() => {
        return notesList
            .reduce<NotesListGroup[]>((previousValue: NotesListGroup[], currentValue): NotesListGroup[] => {
                const pathParts = (currentValue.path || "").split("/").filter(value => !!value)

                return addToGroup(previousValue, currentValue, pathParts)
            }, [])
            .sort((a, b) => (a.path || "").localeCompare(b.path || ""))
    }, [notesList])

    const createNote = async () => {
        setDisable(true)
        const newNote = await notesDao.create("dnd/thirteen", "")
        history.push(`/notes/${newNote.id}`)
    }

    return (
        <div className='notes-list-container'>
            <h1>Notes List</h1>
            <button className='notes-create-button' onClick={createNote} disabled={disable}>Create note</button>
            <div>
                {groupedNotes.map(group => <NotesDirectory notesListGroup={group} level={0} disable={disable} key={group.path} />)}
            </div>
        </div>
    )
}

type NotesDirectoryProps = {
    notesListGroup: NotesListGroup,
    level: number,
    disable: boolean,
}

const NotesDirectory = ({ notesListGroup, level, disable }: NotesDirectoryProps) => {
    const padChar = "\u00A0\u00A0"
    const padSpace = new Array(level).fill(0).map(_ => "\u00A0").join("")

    const [collapsed, setCollapsed] = useState(false)

    return (
        <div>
            <a onClick={() => setCollapsed(!collapsed)}>{padSpace} {notesListGroup.path || "<root>"}</a>
            {!collapsed && <>
            {notesListGroup.notes
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(notes => 
                    <div key={notes.id} ><span>{padSpace + padChar}</span><Link href={`/notes/${notes.id}`} disabled={disable}>{notes.name || "<untitled>"}</Link></div>
                )
            }
            {notesListGroup.subDirectory && notesListGroup.subDirectory.map(subDirectory => 
                <NotesDirectory notesListGroup={subDirectory} level={level + 1} disable={disable} key={subDirectory.path} />
            )}
            </>
            }
        </div>
    )
}

const addToGroup = (groups: NotesListGroup[], notes: Notes, pathParts: string[]): NotesListGroup[] => {
    const existingGroup = groups.find(group => group.path === pathParts[0]) || {
        path: pathParts[0],
        notes: [],
    }

    let newGroup: NotesListGroup

    if (pathParts.length > 1) {
        const [_head, ...tail] = pathParts
        const newSubdirectory = addToGroup(existingGroup.subDirectory || [], notes, tail)
        
        newGroup = {
            ...existingGroup,
            subDirectory: newSubdirectory,
        }
    } else {
        newGroup = {
            ...existingGroup,
            notes: [...existingGroup.notes, notes]
        }
    }

    return [...groups.filter(group => group.path !== pathParts[0]), newGroup]
}
