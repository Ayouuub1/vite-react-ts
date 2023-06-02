import { Action } from "./Action";
import { UpdateNote } from "./UpdateNote";

export interface Note {
    id: number;
    title: string;
    rate: string;
    comment: string;
}

export const noteReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'ADD_NOTE':
        return {
          ...state,
          notes: [...state.notes, action.payload as Note]
        };
      case 'UPDATE_NOTE':
        const { id, updates } = action.payload as UpdateNote;
        return {
          ...state,
          notes: state.notes.map((note) => {
            if (note.id === id) {
              return {
                ...note,
                ...updates
              };
            }
            return note;
          })
        };
      case 'DELETE_NOTE': {
        const { id } = action.payload;
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== id)
        };
      }
      default:
        return state;
    }
  };

export interface State {
    notes: Note[];
}