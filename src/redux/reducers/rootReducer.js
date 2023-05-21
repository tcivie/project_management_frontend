import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import userReducer from './userReducer';
import drawerReducer from './drawerReducer';

const rootReducer = combineReducers({
  search: searchReducer,
  user: userReducer,
  drawer: drawerReducer,
  // other reducers would go here
});

export default rootReducer;
