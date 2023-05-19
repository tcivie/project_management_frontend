import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  search: searchReducer,
  user: userReducer,
  // other reducers would go here
});

export default rootReducer;
