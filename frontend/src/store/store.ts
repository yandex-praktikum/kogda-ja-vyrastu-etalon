import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import systemReducer from './systemSlice';
import allReducer from './allSlice';
import viewReducer from './viewSlice';
import apiReducer from './apiSlice';
import userReducer from './userSlice';
import formsReducer from './formsReducer';

const store = configureStore({
  reducer: {
    system: systemReducer,
    all: allReducer,
    view: viewReducer,
    api: apiReducer,
    profile: userReducer,
    forms: formsReducer,
  },
  middleware: [thunk],
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
