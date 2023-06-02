import { Note } from "./Note";
import { UpdateNote } from "./UpdateNote";

export interface Action {
    type: 'ADD_NOTE' | 'UPDATE_NOTE' | 'DELETE_NOTE'
    payload: Note | UpdateNote;
  }