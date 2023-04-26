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
    return new Date(b?.updatedAt) - new Date(a?.updatedAt);
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
    return sortByDate(newnotesFilteredByCategory);
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
    const newNoteTypeNotes = allNotes.filter(item => item?.isFavorite === true);
    return sortByDate(newNoteTypeNotes);
  }
};

/*
    Notes: allNotes, archivedNotes, trashedNotes, searchedNotes... (goes on)
   ***Reducing their number reduces the performance of the app (if I tested correctly...)
*/
export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    crrNote: {}, //Selected note to edit (you can see the structure of crrNote in EditNoteScreen)
    /*--------------*/
    allNotes: [], //Non-filtered notes (Excluding: trashedNotes & archivedNotes)
    archivedNotes: [],
    trashedNotes: [],
    /*--------------*/
    searchText: '', //last search input (stored for updating searched notes in case of a change)
    searchedNotes: [],
    /*--------------*/
    selectedNoteType: '', //Favorites, alarmed notes, notes with images...
    notesFilteredByType: [],
    /*--------------*/
    homenotesLoading: false,
    notesFilteredByCategory: [], //Notes filtered by custom categories user created
    categories: [],
    selectedCategory: 'All',
    /*--------------*/
    allTasks: [],
    tasksFilteredByDate: [],
    selectedTaskDate: '',
    homeTasks: [], //Closest tasks will be displayed on homescreen
  },
  reducers: {
    addTask(state, action) {
      /* action.payload: {} */
      if (!state.allTasks) {
        //dont know why but if I don't do this, it will throw "undefined" error
        state.allTasks = [];
      }
      state.allTasks.push(action.payload);
      //update tasksfilteredbydate
      state.tasksFilteredByDate = state.allTasks.filter(
        item => item.due_date === state.selectedTaskDate,
      );
      state.tasksFilteredByDate.sort((a, b) => a?.isDone - b?.isDone);
    },
    filterTasksByDate(state, action) {
      state.selectedTaskDate = action.payload;
      /* action.payload: "YYYY-MM-DD" */
      state.tasksFilteredByDate = state.allTasks.filter(
        item => item.due_date === action.payload,
      );
      state.tasksFilteredByDate.sort((a, b) => a?.isDone - b?.isDone);
    },
    checkTask(state, action) {
      /* action.payload: "id" */
      let newAllTasks = state.allTasks;
      const index = newAllTasks?.findIndex(item => item?.id === action.payload);

      let selectedTask = newAllTasks[index];
      console.log(selectedTask, 'AAAAAAAAAAAAAAAAAAAAAAA');
      selectedTask.isDone = !selectedTask.isDone;

      newAllTasks = newAllTasks?.filter(item => item.id !== action.payload);
      newAllTasks.push(selectedTask);

      state.allTasks = newAllTasks;
      //update tasksfilteredbydate
      state.tasksFilteredByDate = state.allTasks.filter(
        item => item.due_date === state.selectedTaskDate,
      );
      state.tasksFilteredByDate.sort((a, b) => a?.isDone - b?.isDone);
    },
    getClosestTasks(state) {
      // let crrDate = new Date().toISOString().slice(0, 10)  //to format the date as YYYY-MM-DD
      const newTasks = state.allTasks.filter(item => {
        // if (!item.isDone) {
        const taskDate = new Date(item?.due_date);
        const crrDate = new Date();
        //return if the task isn't due yet
        return taskDate > crrDate;
      });
      let undoneTasks = newTasks.filter((item, index) => item.isDone !== true);
      if (undoneTasks?.length < 3) {
        switch (undoneTasks?.length) {
          case 2:
            let doneTasks = newTasks.filter(
              (item, index) => index === 0 && item.isDone && item,
            );
            state.homeTasks = doneTasks.concat(undoneTasks);
            break;
          case 1:
            let doneTasks2 = newTasks.filter(
              (item, index) => index < 2 && item.isDone && item,
            );
            state.homeTasks = doneTasks2.concat(undoneTasks);
            break;
          default:
            let doneTasks3 = newTasks.filter(
              (item, index) => index < 3 && item.isDone && item,
            );
            state.homeTasks = doneTasks3.concat(undoneTasks);
        }
      } else {
        //return only 3 tasks
        state.homeTasks = undoneTasks.filter(
          (item, index) => index < 3 && item,
        );
      }
    },
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
    trashNote(state, action) {
      const index = state.allNotes?.findIndex(
        item => item?.id === action.payload,
      );
      let trashedNote = state.allNotes[index];
      let newTrashedNotes = state.trashedNotes;
      newTrashedNotes?.unshift(trashedNote); //add to the front (user will see the last trashed note at the top)
      state.trashedNotes = newTrashedNotes;
      state.allNotes = state.allNotes?.filter(
        item => item?.id !== action.payload,
      );
      state.notesFilteredByCategory = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
    trashMultipleNotes(state, action) {
      const selectedNotes = action.payload; //array of IDs
      selectedNotes.map(noteID => {
        const index = state.allNotes?.findIndex(item => item?.id === noteID);
        let trashedNote = state.allNotes[index];
        let newTrashedNotes = state.trashedNotes;
        newTrashedNotes?.unshift(trashedNote); //add to the front
        state.trashedNotes = newTrashedNotes;
        state.allNotes = state.allNotes?.filter(item => item?.id !== noteID);
      });
      state.notesFilteredByCategory = refilterAfterUpdate(
        state.allNotes,
        state.selectedCategory,
      );
    },
    removeNoteFromTrash(state, action) {
      //restore note
      /* action.payload: id of the selected note */
      const index = state.trashedNotes?.findIndex(
        item => item?.id === action.payload,
      );
      const crrDate = new Date();
      let selectedNote = state.trashedNotes[index];
      selectedNote.updatedAt = crrDate;
      state.trashedNotes = state.trashedNotes?.filter(
        item => item?.id !== action.payload,
      );
      state.allNotes.push(selectedNote);
      state.allNotes = sortByDate(state.allNotes);
    },
    removeMultipleNotesFromTrash(state, action) {
      //Restore note
      /* action.payload: array of ids */
      const selectedNotes = action.payload;
      selectedNotes?.map(noteID => {
        const crrDate = new Date();
        const index = state.trashedNotes?.findIndex(
          item => item?.id === noteID,
        );
        let selectedNote = state.trashedNotes[index];
        selectedNote.updatedAt = crrDate;
        state.trashedNotes = state.trashedNotes?.filter(
          item => item?.id !== noteID,
        );
        state.allNotes.push(selectedNote);
      });
      state.allNotes = sortByDate(state.allNotes);
    },
    permanentlyDeleteNote(state, action) {
      /* action.payload: id of the selected note */
      state.trashedNotes = state.trashedNotes?.filter(
        item => item?.id !== action.payload,
      );
    },
    permanentlyDeleteMultipleNotes(state, action) {
      /* action.payload: array of ids */
      const selectedNotes = action.payload;
      selectedNotes?.map(noteID => {
        state.trashedNotes = state.trashedNotes?.filter(
          item => item?.id !== noteID,
        );
      });
    },
    archiveNote(state, action) {
      const index = state.allNotes?.findIndex(
        item => item?.id === action.payload,
      );
      let selectedNote = state.allNotes[index];
      let newArchivedNotes = state.archivedNotes;
      newArchivedNotes?.unshift(selectedNote);
      state.archivedNotes = newArchivedNotes;
      state.allNotes = state.allNotes?.filter(
        item => item?.id !== action.payload,
      );
      //updating notes in every screen
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
    archiveMultipleNotes(state, action) {
      /* action.payload: array of ids */
      const selectedNotes = action.payload;
      selectedNotes?.map(noteID => {
        const index = state.allNotes?.findIndex(item => item?.id === noteID);
        let selectedNote = state.allNotes[index];
        let newArchivedNotes = state.archivedNotes;
        newArchivedNotes?.unshift(selectedNote);
        state.archivedNotes = newArchivedNotes;
        state.allNotes = state.allNotes?.filter(item => item?.id !== noteID);
      });
      //updating notes in every screen
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
    unarchiveNotes(state, action) {
      /* action.payload: array of ids */
      const selectedNotes = action.payload;
      selectedNotes?.map(noteID => {
        const index = state.archivedNotes?.findIndex(
          item => item?.id === noteID,
        );
        const selectedNote = state.archivedNotes[index];
        state.allNotes?.push(selectedNote);
        state.archivedNotes = state.archivedNotes?.filter(
          item => item?.id !== noteID,
        );
      });
      //updating notes in every screen
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
    favNote(state, action) {
      //adding a note to favorites
      const index = state.allNotes?.findIndex(
        item => item?.id === action.payload,
      );
      const otherNotes = state.allNotes?.filter(
        item => item?.id !== action.payload,
      );
      let selectedNote = state.allNotes[index];
      selectedNote.isFavorite = !selectedNote?.isFavorite;
      otherNotes.push(selectedNote);
      state.allNotes = sortByDate(otherNotes);
      //updating notes in every screen
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
        item => item?.id === action.payload,
      );
      state.crrNote = state.allNotes[index];
    },
    editNote(state, action) {
      const newNotes = state.allNotes?.filter(
        item => item?.id !== action.payload.id,
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
      const index = state.categories.findIndex(
        item => item?.id === action.payload.id,
      );
      let editedCategory = state.categories[index];
      editedCategory.name = action.payload.newName.trim();
      state.categories = state.categories.filter(
        item => item?.id !== action.payload.id,
      );
      state.categories.push(editedCategory);
    },
    deleteCategory(state, action) {
      state.categories = state.categories?.filter(
        item => item?.id !== action.payload,
      );
    },
    changeCategory(state, action) {
      /*FIRSTLY - adding the chosen category to the start*/
      state.selectedCategory = action.payload;
      //if "all" is not selected, add the chosen category to the left
      if (action.payload !== 0) {
        const chosenCategoryIndex = state.categories?.findIndex(
          item => item?.id == action.payload,
        );
        let chosenCategory = state.categories[chosenCategoryIndex];
        let sortedCategories = state.categories?.filter(
          item => item?.id !== state.selectedCategory,
        );
        sortedCategories?.unshift(chosenCategory);
        state.categories = sortedCategories;
      }
    },
    filterNotesByCategory(state, action) {
      state.homenotesLoading = true;

      /* SECONDLY - Filtering */
      if (action.payload === 0) {
        //0 means no filter (All notes)
        state.notesFilteredByCategory = state.allNotes;
      } else {
        state.notesFilteredByCategory = state.allNotes?.filter(note =>
          note?.categories?.includes(action.payload),
        );
      }

      state.homenotesLoading = false;
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
  addTask,
  filterTasksByDate,
  checkTask,
  getClosestTasks,
  createNote,
  addNote,
  trashNote,
  trashMultipleNotes,
  removeNoteFromTrash,
  removeMultipleNotesFromTrash,
  permanentlyDeleteNote,
  permanentlyDeleteMultipleNotes,
  archiveNote,
  archiveMultipleNotes,
  unarchiveNotes,
  favNote,
  selectNote,
  editNote,
  changeCategory,
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
