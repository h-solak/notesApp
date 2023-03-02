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

const refilterAfterUpdate = (allNotes, selectedCategory) => {
  //update filteredNotes after changes
  if (selectedCategory === 'All' || !selectedCategory) {
    return allNotes;
  } else {
    console.log('12312', allNotes);
    console.log(
      'a',
      allNotes?.filter(item => item.category === selectedCategory),
    );
    let newNotes = allNotes?.filter(item => item.category === selectedCategory);
    return newNotes;
  }
};

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    allNotes: [], //All notes without filter (It will only be used in this slice)
    filteredNotes: [], //This will be shown on the app
    crrNote: {}, //Selected note to edit
    categories: [],
    selectedCategory: 'All',
  },
  reducers: {
    addNote(state, action) {
      let newNotes = state.allNotes;
      newNotes.push(action.payload);
      state.allNotes = sortByDate(newNotes);
      state.filteredNotes = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
    deleteNote(state, action) {
      state.allNotes = state.allNotes?.filter(
        item => item.id !== action.payload,
      );
      state.filteredNotes = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
    favNote(state, action) {
      //adding a note to favorites
      const index = state.allNotes?.findIndex(
        item => item.id === action.payload,
      );
      const otherNotes = state.allNotes?.filter(
        item => item.id !== action.payload,
      );
      let selectedNote = state.allNotes[index];
      selectedNote.isFavorite = !selectedNote.isFavorite;
      otherNotes.push(selectedNote);
      state.allNotes = sortByDate(otherNotes);
      state.filteredNotes = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
    selectNote(state, action) {
      //choosing a note to edit
      const index = state.allNotes?.findIndex(
        item => item.id === action.payload,
      );
      state.crrNote = state.allNotes[index];
      console.log(state.crrNote);
    },
    editNote(state, action) {
      const newNotes = state.allNotes?.filter(
        item => item.id !== action.payload.id,
      );
      let editedNote = action.payload;
      newNotes.push(editedNote);
      state.allNotes = sortByDate(newNotes);
      state.filteredNotes = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
    filterNotesByCategory(state, action) {
      //adding the chosen category to the start
      state.selectedCategory = action.payload;
      let sortedCategories = state.categories?.filter(
        item => item !== state.selectedCategory,
      );
      if (state.selectedCategory !== 'All') {
        sortedCategories?.unshift(state.selectedCategory);
      }
      state.categories = sortedCategories;
      //apply the filter
      if (action.payload === 'All') {
        //no filter
        state.filteredNotes = state.allNotes;
      } else {
        state.filteredNotes = state.allNotes?.filter(
          note => note.category == action.payload,
        );
      }
    },
    resetNotes(state) {
      state.allNotes = [];
      state.filteredNotes = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNote,
  deleteNote,
  favNote,
  selectNote,
  editNote,
  setFilterForNotes,
  filterNotesByCategory,
  resetNotes,
} = noteSlice.actions;

export default noteSlice.reducer;
