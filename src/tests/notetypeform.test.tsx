import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {vi} from "vitest";
import NoteTypeForm from '../components/NoteTypeForm';

describe('ContactForm', () => {
  test('should render the form and handle form submission', () => {
    const mockDispatch = vi.fn();
    const mockToggleModal = vi.fn();
    const mockDataToEdit = undefined;

    const { getByLabelText, getByText } = render(
      <NoteTypeForm
        dispatch={mockDispatch}
        dataToEdit={mockDataToEdit}
        toggleModal={mockToggleModal}
      />
    );

    const titreInput = getByLabelText('Titre');
    const noteInput = getByLabelText('Note');
    const commentaireInput = getByLabelText('Commentaire');
    const submitButton = getByText('Ajouter');

    // Simulate user input
    fireEvent.change(titreInput, { target: { value: 'Titre du commentaire' } });
    fireEvent.change(noteInput, { target: { value: '5' } });
    fireEvent.change(commentaireInput, {
      target: { value: 'Ceci est un commentaire' },
    });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Assertions
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_NOTE',
      payload: {
        id: expect.any(Number),
        title: 'Titre du commentaire',
        rate: '5',
        comment: 'Ceci est un commentaire',
      },
    });
    expect(titreInput.value).toBe('');
    expect(noteInput.value).toBe('0');
    expect(commentaireInput.value).toBe('');
  });

  test('should render the form with pre-filled data and handle form submission', () => {
    const mockDispatch = vi.fn();
    const mockToggleModal = vi.fn();
    const mockDataToEdit = {
      id: 1,
      title: 'Ancien titre',
      rate: '3',
      comment: 'Ancien commentaire',
    };

    const { getByLabelText, getByText } = render(
      <NoteTypeForm
        dispatch={mockDispatch}
        dataToEdit={mockDataToEdit}
        toggleModal={mockToggleModal}
      />
    );

    const titreInput = getByLabelText('Titre');
    const noteInput = getByLabelText('Note');
    const commentaireInput = getByLabelText('Commentaire');
    const submitButton = getByText('Mise à jour');

    // Assertions
    expect(titreInput.value).toBe('Ancien titre');
    expect(noteInput.value).toBe('3');
    expect(commentaireInput.value).toBe('Ancien commentaire');

    // Simulate user input
    fireEvent.change(titreInput, { target: { value: 'Nouveau titre' } });
    fireEvent.change(noteInput, { target: { value: '4' } });
    fireEvent.change(commentaireInput, {
      target: { value: 'Nouveau commentaire' },
    });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Assertions
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_COM',
      payload: {
        id: 1,
        updates: {
          id: expect.any(Number),
          titre: 'Nouveau titre',
          note: 4,
          commentaire: 'Nouveau commentaire',
        },
      },
    });
    expect(mockToggleModal).toHaveBeenCalledTimes(1);
    expect(titreInput.value).toBe('Nouveau titre');
    expect(noteInput.value).toBe('0');
    expect(commentaireInput.value).toBe('');
  });

  test('should display an error message if any field is empty', () => {
    const mockDispatch = vi.fn();
    const mockToggleModal = vi.fn();
    const mockDataToEdit = undefined;

    const { getByLabelText, getByText } = render(
      <NoteTypeForm
        dispatch={mockDispatch}
        dataToEdit={mockDataToEdit}
        toggleModal={mockToggleModal}
      />
    );

    const submitButton = getByText('Ajouter');

    // Simulate form submission without filling in any fields
    fireEvent.click(submitButton);

    // Assertion
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(getByText('All the fields are required.')).toBeInTheDocument();
  });
});