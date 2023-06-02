import { FC } from 'react';
import { Note } from '../interface/Note';
import { Action } from '../interface/Action';
import { Button } from 'react-bootstrap';
import NoteItem from './NoteItem';

interface NoteListProps {
  notes: Note[];
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}

const NoteList: FC<NoteListProps> = ({
  notes,
  handleEdit,
  dispatch
}) => {
  return (
    <div className='notes-list'>
      <h3 className='notes-list-title'>Liste des notes</h3>
      <div className='notes-list-table-container'>
        <table className='notes-list-table'>
          <thead className='notes-list-header'>
            <tr>
              <th>Titre</th>
              <th>Note</th>
              <th>Commentaire</th>
              <th>Date</th>
              <th>Modifier</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    {...note}
                    handleEdit={handleEdit}
                    dispatch={dispatch}
                />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoteList;
