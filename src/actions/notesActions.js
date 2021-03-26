import { getAllNotes, createNote, editNote, deleteNote } from '../api';

export const GET_NOTES_LOADING_START = 'GET_NOTES_LOADING_START';
export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
export const GET_NOTES_ERROR = 'GET_NOTES_ERROR';


export const getNotesAction = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_NOTES_LOADING_START,
    });

    try {
      const notes = await getAllNotes();
     /*  const notes = await fetch(`http://localhost:5000/api/note`,{
        method: 'GET',  
      headers: {
          Authorization: localStorage.getItem('token'),
        },
      }).then((res) => res.json()); */
    

      dispatch({
        type: GET_NOTES_SUCCESS,
        payload: notes,
      });
    } catch (error) {
      dispatch({
        type: GET_NOTES_ERROR,
        payload: 'Ceva nu a mers bine',
      });
    }
  };
};

export const CREATE_NOTE_ERROR = 'CREATE_NOTE_ERROR';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';

export const createNoteAction = (note) => {
  return async (dispatch) => {
    try {
      const createdNote = await createNote(note);
      dispatch({
        type: CREATE_NOTE_SUCCESS,
        payload: createdNote,
      });
    } catch (error) {
      dispatch({
        type: CREATE_NOTE_ERROR,
        payload: 'Ceva nu a mers bine',
      });
    }
  };
};

export const EDIT_NOTE_ERROR = 'EDIT_NOTE_ERROR';
export const EDIT_NOTE_SUCCESS = 'EDIT_NOTE_SUCCESS';

export const editNoteAction = (noteId, note) => {
  return async (dispatch) => {
    try {
      const editedNote = await editNote(noteId, note);
      dispatch({ type: EDIT_NOTE_SUCCESS, payload: editedNote });
    } catch (error) {
      dispatch({
        type: EDIT_NOTE_ERROR,
        payload: 'Ceva nu a mers bine',
      });
    }
  };
};

export const DELETE_NOTE_ERROR = 'DELETE_NOTE_ERROR';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';

export const deleteNoteAction = (noteId) => {
  return (dispatch) => {
    return deleteNote(noteId)
      .then((deletedNote) => {
        dispatch({ type: DELETE_NOTE_SUCCESS, payload: deletedNote });
      })
      .catch((error) => {
        dispatch({
          type: DELETE_NOTE_ERROR,
          payload: 'Ceva nu a mers bine',
        });
      });
  };
};