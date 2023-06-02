import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { Note } from '../interface/Note';
import { Action } from '../interface/Action';
import NoteTypeForm from './NoteTypeForm';

interface EditModalProps {
  showModal: boolean;
  dataToEdit: Note | undefined;
  toggleModal: () => void;
  dispatch: React.Dispatch<Action>;
}

const NoteEditFormType: FC<EditModalProps> = ({
  toggleModal,
  dataToEdit,
  showModal,
  dispatch
}) => {
  return (
    <Modal show={showModal} onHide={toggleModal} className='note-edit-form'>
      <Modal.Header closeButton>
        <Modal.Title>Modifier la note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NoteTypeForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default NoteEditFormType;
