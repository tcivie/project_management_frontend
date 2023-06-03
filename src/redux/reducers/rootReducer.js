import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import userReducer from './userReducer';
import drawerReducer from './drawerReducer';
import postReducer from './postReducer';
import tagReducer from './tagReducer';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
  search: searchReducer,
  user: userReducer,
  drawer: drawerReducer,
  post: postReducer,
  tag: tagReducer,
  file: fileReducer,
});

export default rootReducer;
