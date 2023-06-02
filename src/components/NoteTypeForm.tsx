import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Action } from '../interface/Action';
import { Note } from '../interface/Note';

interface NoteFormProps {
  dispatch: React.Dispatch<Action>;
  dataToEdit: Note | undefined;
  toggleModal: () => void;
}

const NoteTypeForm: FC<NoteFormProps> = ({
  dispatch,
  dataToEdit,
  toggleModal
}) => {
  const [note, setNote] = useState({
    title: dataToEdit?.title ? dataToEdit.title : '',
    rate: dataToEdit?.rate ? dataToEdit.rate : '',
    comment: dataToEdit?.comment ? dataToEdit.comment : '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNote((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, rate, comment } = note;

    if (
        title.trim() === '' ||
        rate.trim() === '' ||
        comment.trim() === ''
    ) {
      setErrorMsg('Veuillez remplir tous les champs');
      return;
    }

    if (!dataToEdit) {
      dispatch({
        type: 'ADD_NOTE',
        payload: {
          id: Date.now(),
          ...note
        }
      });
      setNote({
        title: '',
        rate: '',
        comment: '',
      });
      setErrorMsg('');
    } else {
      dispatch({
        type: 'UPDATE_NOTE',
        payload: {
          id: dataToEdit.id,
          updates: {
            id: Date.now(),
            ...note
          }
        }
      });
      toggleModal();
    }
  };

  return (
    <Form onSubmit={handleOnSubmit} className='note-form'>
      {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
      <Form.Group controlId='title'>
        <Form.Label>Titre ou Matière</Form.Label>
        <Form.Control
          className='title'
          name='title'
          value={note.title}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='rate'>
        <Form.Label>Note</Form.Label>
        <Form.Control
          className='rate'
          name='rate'
          value={note.rate}
          type='number'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='comment'>
        <Form.Label>Commentaire</Form.Label>
        <Form.Control
          className='comment'
          name='comment'
          value={note.comment}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='submit'>
        <Button variant='primary' type='submit'>
          {dataToEdit ? 'Modifier la note' : 'Ajouter la note'}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default NoteTypeForm;