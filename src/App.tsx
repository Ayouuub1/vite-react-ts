import './App.css';
import { useEffect, useReducer, useState } from 'react';
import NoteTypeForm from './components/NoteTypeForm';
import { Note, State, noteReducer } from './interface/Note';
import NoteList from './components/NoteList';
import NoteEditFormType from './components/NoteEditFormType';

const initialState: State = {
	notes: []
  };

function App() {
	const [state, dispatch] = useReducer(noteReducer, initialState);
  	const [showModal, setShowModal] = useState(false);
  	const [dataToEdit, setDataToEdit] = useState<Note | undefined>(undefined);

	useEffect(() => {
		if (!showModal) {
		setDataToEdit(undefined);
		}
	}, [showModal]);

	const toggleModal = () => {
		setShowModal((show) => !show);
	};

	const handleEdit = (id: number) => {
		setDataToEdit(state.notes.find((note) => note.id === id));
		toggleModal();
	};

	return (
		<>
		<header>
      		<h1>Gestion des notes</h1>
    	</header>
		<NoteTypeForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
		{state.notes.length > 0 && (
			<NoteList
            notes={state.notes}
            handleEdit={handleEdit}
            dispatch={dispatch}
          />
        )}
		<NoteEditFormType
			showModal={showModal}
			dataToEdit={dataToEdit}
			toggleModal={toggleModal}
			dispatch={dispatch}
		/>
		</>
	);
}

export default App;
