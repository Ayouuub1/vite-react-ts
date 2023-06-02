import { Action } from "../interface/Action";
import { State, noteReducer } from "../interface/Note";

describe('noteReducer', () => {
  let initialState: State;
  
  beforeEach(() => {
    initialState = {
      notes: [
        { id: 1, title: 'Note 1', rate: '5', comment: 'Hey note' },
        { id: 2, title: 'Note 2', rate: '3', comment: 'Average note' }
      ]
    };
  });

  it('should add a new note when action type is ADD_NOTE', () => {
    const action: Action = {
      type: 'ADD_NOTE',
      payload: { id: 3, title: 'Note 3', rate: '4', comment: 'Good note' }
    };

    const newState = noteReducer(initialState, action);

    expect(newState.notes).toHaveLength(initialState.notes.length + 1);
    expect(newState.notes).toContainEqual(action.payload);
  });

  it('should update the note when action type is UPDATE_NOTE', () => {
    const action: Action = {
      type: 'UPDATE_NOTE',
      payload: {
        id: 2,
        updates: { rate: '4', comment: 'Updated note' }
      }
    };

    const newState = noteReducer(initialState, action);

    expect(newState.notes).toHaveLength(initialState.notes.length);
    expect(newState.notes[1].rate).toEqual(action.payload.updates.rate);
    expect(newState.notes[1].comment).toEqual(action.payload.updates.comment);
  });

  it('should delete the note when action type is DELETE_NOTE', () => {
    const action: Action = {
		type: 'DELETE_NOTE',
		payload: { id: 1 }
	  };

    const newState = noteReducer(initialState, action);

    expect(newState.notes).toHaveLength(initialState.notes.length - 1);
    expect(newState.notes).not.toContainEqual(initialState.notes[0]);
  });

  it('should return the current state when action type is unknown', () => {
    const action: Action = {
      type: 'UNKNOWN_ACTION',
      payload: { id: 1 }
    };

    const newState = noteReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});