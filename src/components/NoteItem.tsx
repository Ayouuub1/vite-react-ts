import { FC } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Action } from '../interface/Action';
import { Note } from '../interface/Note';

export interface ExtraProps {
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}

const NoteItem: FC<Note & ExtraProps> = ({
  id,
  title,
  rate,
  comment,
  handleEdit,
  dispatch
}) => {
  
  var date = new Date(id);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return (
    <tr style={{ backgroundColor: rate < 8 ? "red" : rate < 10 ? "orange" : rate < 13 ? "yellow" : "green" }}>
      <td>{title}</td>
      <td>{rate}</td>
      <td>{comment}</td>
      <td>{formattedDateTime}</td>
      <td>
        <AiFillEdit size={20} onClick={() => handleEdit(id)} className='icon' />
      </td>
      <td>
        <AiFillDelete
          size={20}
          onClick={() => {
            const confirmDelete = window.confirm(
              `Êtes-vous sûr de vouloir supprimer cette note ?`
            );
            if (confirmDelete) {
              dispatch({
                type: 'DELETE_NOTE',
                payload: { id }
              });
            }
          }}
          className='icon'
        />
      </td>
    </tr>
  );
};

export default NoteItem;
