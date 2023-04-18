import {createSlice} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

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
  //update notesFilteredByCategory after changes
  if (selectedCategory == 0 || !selectedCategory) {
    return allNotes;
  } else {
    let newnotesFilteredByCategory = allNotes?.filter(item =>
      item.categories?.includes(selectedCategory),
    );
    return newnotesFilteredByCategory;
  }
};

const updateSearchedNotesAfterUpdate = (allNotes, searchText) => {
  if (searchText?.length > 0) {
    let newSearchedNotes = allNotes?.filter(
      item =>
        item.title?.toLowerCase().includes(searchText?.toLowerCase().trim()) ||
        item.text?.toLowerCase().includes(searchText?.toLowerCase().trim()),
    );
    return newSearchedNotes;
  }
  return allNotes;
};

const updateNoteTypeNotesAfterChange = (allNotes, selectedNoteType) => {
  if (selectedNoteType === 'Your Favorites') {
    const newNoteTypeNotes = allNotes.filter(item => item.isFavorite === true);
    return newNoteTypeNotes;
  }
};

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    allNotes: [], //All notes without filter (It will only be used in this slice)
    archivedNotes: [],
    trashedNotes: [],
    /*--------------*/
    searchText: '', //last search input (stored for updating searched notes in case of a change)
    searchedNotes: [],
    /*--------------*/
    selectedNoteType: '', //Favorites, alarmed notes, notes with images...
    notesFilteredByType: [],
    /*--------------*/
    notesFilteredByCategory: [], //Notes filtered by custom categories user created
    categories: [],
    selectedCategory: 'All',
    /*--------------*/
    crrNote: {}, //Selected note to edit
  },
  reducers: {
    createNote(state, action) {
      const crrDate = new Date();
      const newId = uuid.v4();

      state.crrNote = {
        id: newId,
        title: '',
        text: '',
        color: '#000000',
        emoji: '✍️',
        categories: [],
        isFavorite: false,
        createdAt: crrDate,
        updatedAt: crrDate,
      };
    },
    addNote(state, action) {
      let newNotes = state.allNotes;
      newNotes.push(action.payload);
      state.allNotes = sortByDate(newNotes);
      state.notesFilteredByCategory = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
    deleteNote(state, action) {
      //send to trash
      let index = state.allNotes?.findIndex(item => item.id === action.payload);
      let trashedNote = state.allNotes[index];
      let newTrashedNotes = state.trashedNotes;
      newTrashedNotes?.push(trashedNote);
      state.trashedNotes = newTrashedNotes;
      state.allNotes = state.allNotes?.filter(
        item => item.id !== action.payload,
      );
      state.notesFilteredByCategory = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
    deleteMultipleNotes(state, action) {
      let selectedNotes = action.payload; //array of IDs
      console.log('abuuuu', selectedNotes);
      selectedNotes.map(noteID => {
        let index = state.allNotes?.findIndex(item => item.id === noteID);
        let trashedNote = state.allNotes[index];
        let newTrashedNotes = state.trashedNotes;
        newTrashedNotes?.push(trashedNote);
        state.trashedNotes = newTrashedNotes;
        state.allNotes = state.allNotes?.filter(item => item.id !== noteID);
        state.notesFilteredByCategory = refilterAfterUpdate(
          state.allNotes,
          state.selectedCategory,
        );
      });
    },
    removeFromTrash(state, action) {}, //undelete
    permanentlyDeleteNote(state, action) {
      state.trashedNotes = state.trashedNotes?.filter(
        item => item.id !== action.payload,
      );
    },
    archiveNote(state, action) {
      let index = state.allNotes?.findIndex(item => item.id === action.payload);
      let selectedNote = state.allNotes[index];
      let newArchivedNotes = state.archivedNotes;
      newArchivedNotes?.push(selectedNote);
      state.archivedNotes = newArchivedNotes;
      state.allNotes = state.allNotes?.filter(
        item => item.id !== action.payload,
      );
      state.notesFilteredByCategory = refilterAfterUpdate(
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
      state.notesFilteredByCategory = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
      state.searchedNotes = updateSearchedNotesAfterUpdate(
        state.allNotes,
        state.searchText,
      );
      state.notesFilteredByType = updateNoteTypeNotesAfterChange(
        state.allNotes,
        state.selectedNoteType,
      );
    },
    selectNote(state, action) {
      //choosing a note to edit
      const index = state.allNotes?.findIndex(
        item => item.id === action.payload,
      );
      state.crrNote = state.allNotes[index];
    },
    editNote(state, action) {
      const newNotes = state.allNotes?.filter(
        item => item.id !== action.payload.id,
      );
      let editedNote = action.payload;
      newNotes.push(editedNote);
      state.allNotes = sortByDate(newNotes);
      state.notesFilteredByCategory = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
    addCategory(state, action) {
      const categoryAlreadyExists = state.categories.some(
        item =>
          item.name.toLowerCase().trim() ===
          action.payload.toLowerCase().trim(),
      );
      if (!categoryAlreadyExists) {
        let newCategory = {id: uuid.v4(), name: action.payload.trim()};
        state.categories?.push(newCategory);
      } else {
        console.log('Already Exists!');
      }
    },
    editCategory(state, action) {
      let index = state.categories.findIndex(
        item => item.id === action.payload.id,
      );
      let editedCategory = state.categories[index];
      editedCategory.name = action.payload.newName.trim();
      state.categories = state.categories.filter(
        item => item.id !== action.payload.id,
      );
      state.categories.push(editedCategory);
    },
    deleteCategory(state, action) {
      state.categories = state.categories?.filter(
        item => item.id !== action.payload,
      );
    },
    filterNotesByCategory(state, action) {
      /*FIRSTLY - adding the chosen category to the start*/
      state.selectedCategory = action.payload;
      //if "all" is not selected, add the chosen category to the left
      if (action.payload != 0) {
        const chosenCategoryIndex = state.categories?.findIndex(
          item => item.id == action.payload,
        );
        let chosenCategory = state.categories[chosenCategoryIndex];
        let sortedCategories = state.categories?.filter(
          item => item.id !== state.selectedCategory,
        );
        sortedCategories?.unshift(chosenCategory);
        state.categories = sortedCategories;
      }

      /* SECONDLY - Filtering */
      if (action.payload === 0) {
        //no filter (All)
        state.notesFilteredByCategory = state.allNotes;
      } else {
        state.notesFilteredByCategory = state.allNotes?.filter(note =>
          note.categories?.includes(action.payload),
        );
      }
    },
    selectNoteTypeAndFilter(state, action) {
      state.selectedNoteType = action.payload;
      if (action.payload === 'Your Favorites') {
        state.notesFilteredByType = state.allNotes?.filter(
          item => item.isFavorite === true,
        );
      } else {
        state.notesFilteredByType = [];
      }
    },
    searchNotes(state, action) {
      let newSearchedNotes = state.allNotes.filter(
        item =>
          item.title
            ?.toLowerCase()
            .includes(action.payload?.toLowerCase().trim()) ||
          item.text
            ?.toLowerCase()
            .includes(action.payload?.toLowerCase().trim()),
      );
      state.searchText = action.payload;
      state.searchedNotes = newSearchedNotes;
    },
    resetSearchedNotes(state) {
      state.searchedNotes = state.allNotes;
    },
    resetNotes(state) {
      state.allNotes = [];
      state.notesFilteredByCategory = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createNote,
  addNote,
  deleteNote,
  deleteMultipleNotes,
  permanentlyDeleteNote,
  archiveNote,
  favNote,
  selectNote,
  editNote,
  filterNotesByCategory,
  addCategory,
  editCategory,
  deleteCategory,
  selectNoteTypeAndFilter,
  searchNotes,
  resetSearchedNotes,
  resetNotes,
} = noteSlice.actions;

export default noteSlice.reducer;
