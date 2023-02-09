import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import noteReducer from './slices/noteSlice';

const combinedReducer = combineReducers({
  note: noteReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined; //reset all
    AsyncStorage.setItem('noteredame', '');
    // AsyncStorage.removeItem('noteredame');
  }
  return combinedReducer(state, action);
};

export default rootReducer;
