import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const asyncGetNotes = async () => {
//   try {
//     const notes = JSON.parse(await AsyncStorage.getItem('noteredame'));
//     return notes || [];
//   } catch (err) {}
// };

// const asyncSetNotes = async newNotes => {
//   try {
//     await AsyncStorage.setItem('noteredame', JSON.stringify(newNotes));
//   } catch (err) {}
// };

const sortByDate = arr => {
  return arr.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
};

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: [], //All notes
    crrNote: {}, //Selected note to edit
  },
  reducers: {
    addNote(state, action) {
      let newNotes = state.notes;
      newNotes.push(action.payload);
      state.notes = sortByDate(newNotes);
    },
    deleteNote(state, action) {
      state.notes = state.notes?.filter(item => item.id !== action.payload);
    },
    favNote(state, action) {
      const index = state.notes?.findIndex(item => item.id === action.payload);
      const otherNotes = state.notes?.filter(
        item => item.id !== action.payload,
      );
      let selectedNote = state.notes[index];
      selectedNote.isFavorite = !selectedNote.isFavorite;
      otherNotes.push(selectedNote);
      state.notes = sortByDate(otherNotes);
    },
    selectNote(state, action) {
      const index = state.notes?.findIndex(item => item.id === action.payload);
      state.crrNote = state.notes[index];
      console.log(state.crrNote);
    },
    editNote(state, action) {
      const newNotes = state.notes?.filter(
        item => item.id !== action.payload.id,
      );
      let editedNote = action.payload;
      newNotes.push(editedNote);
      state.notes = sortByDate(newNotes);
    },
    resetNotes(state) {
      state.notes = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {addNote, deleteNote, favNote, selectNote, editNote, resetNotes} =
  noteSlice.actions;

export default noteSlice.reducer;
