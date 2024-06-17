import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../services/api/users';

const initialState: User = {
  id: '0',
  roles: [],
  username: '',
  email: '',
  bio: null,
  image: null,
  nickname: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => ({ ...state, ...action.payload }),
    clearUser: (state) => ({
      ...state, ...initialState,
    }),
  },
});

const userReducer = userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
export default userReducer;
