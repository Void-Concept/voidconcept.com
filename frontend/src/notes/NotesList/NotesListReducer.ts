import { Notes, NotesDao } from "../NotesDao"

export type NotesListLoadAction = {
    action: "load"
}
export const notesLoadAction = (): NotesListLoadAction => ({ action: "load" })


export type NotesListCreateAction = {
    action: "create"
    name: string
}
export const notesCreateAction = (name: string): NotesListCreateAction => ({ action: "create", name })


export type NotestListAction = NotesListLoadAction | NotesListCreateAction

export const notesListReducer = (notesDao: NotesDao) => async (notesList: Notes[], action: NotestListAction): Promise<Notes[]> => {
    switch (action.action) {
        case "load":
            return notesDao.list();
        case "create":
            await notesDao.create(action.name)
            return notesDao.list();
    }
}