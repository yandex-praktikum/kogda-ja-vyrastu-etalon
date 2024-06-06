import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../types/types';

type TProfileFormState = {
  username: string | null;
  nickname: string | null;
  email: string | null;
  bio: string | null;
  image: string | null;
  password: string | null;
};

const initialState: TProfileFormState = {
  username: null,
  nickname: null,
  email: null,
  bio: null,
  image: null,
  password: null,
};

const profileSubSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUsernameProfile: (state, action: PayloadAction<string>) => ({
      ...state, username: action.payload,
    }),
    setNicknameProfile: (state, action: PayloadAction<string>) => ({
      ...state, nickname: action.payload,
    }),
    setEmailProfile: (state, action: PayloadAction<string>) => ({
      ...state, email: action.payload,
    }),
    setBioProfile: (state, action: PayloadAction<string>) => ({
      ...state, bio: action.payload,
    }),
    setImageProfile: (state, action: PayloadAction<string>) => ({
      ...state, image: action.payload,
    }),
    setPasswordProfile: (state, action: PayloadAction<string>) => ({
      ...state, password: action.payload,
    }),
    setFormProfile: (state, action: PayloadAction<TUser>) => ({
      ...state, ...action.payload,
    }),
    resetFormProfile: (state) => ({
      ...state, ...initialState,
    }),
  },
});

const profileReducer = profileSubSlice.reducer;
export const {
  setUsernameProfile,
  setNicknameProfile,
  setEmailProfile,
  setBioProfile,
  setImageProfile,
  setPasswordProfile,
  setFormProfile,
  resetFormProfile,
} = profileSubSlice.actions;
export default profileReducer;
