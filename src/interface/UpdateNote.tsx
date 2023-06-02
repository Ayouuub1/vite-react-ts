import { Note } from "./Note";

export interface UpdateNote {
    id: number;
    updates?: Note;
  }