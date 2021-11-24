import { getToken } from "../oauth/oauthClient";

export interface NotesDao {
    list(): Promise<NotesList>
    get(id: string): Promise<Notes>
    create(name: string): Promise<Notes>
    update(notes: Notes): Promise<Notes>
}

export type Notes = {
    id: string
    name: string
    notes: string
}

export type NotesList = Notes[]

export class NotesDaoImpl {
    private notesUrl = "https://notes.voidconcept.com/notes"

    list = async (): Promise<NotesList> => {
        const response = await fetch(`${this.notesUrl}`, {
            method: "GET"
        })
        const notesList = await response.json() as NotesList
        return notesList
    }

    get = async (id: string): Promise<Notes> => {
        const response = await fetch(`${this.notesUrl}/${id}`, {
            method: "GET"
        })
        const notes = await response.json() as Notes
        return notes
    }

    create = async (name: string): Promise<Notes> => {
        const response = await fetch(`${this.notesUrl}`, {
            method: "POST",
            headers: {
                Authorization: getToken()
            },
            body: JSON.stringify({ name })
        })
        const notes = await response.json() as Notes
        return notes
    }

    update = async (notes: Notes): Promise<Notes> => {
        const response = await fetch(`${this.notesUrl}/${notes.id}`, {
            method: "POST",
            headers: {
                Authorization: getToken()
            },
            body: JSON.stringify(notes)
        })
        const newNotes = await response.json() as Notes
        return newNotes
    }
}