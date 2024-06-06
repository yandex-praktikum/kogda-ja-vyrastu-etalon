import { combineReducers } from 'redux';
import registerReducer from './registerFormSubSlice';
import loginReducer from './loginFormSubSlice';
import newArticleReducer from './articleFormSubSlice';
import profileReducer from './profileFormSubSlice';
import commentSubSlice from './commentFormSubSlice';

const formsReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  article: newArticleReducer,
  profile: profileReducer,
  comment: commentSubSlice,
});

export default formsReducer;
