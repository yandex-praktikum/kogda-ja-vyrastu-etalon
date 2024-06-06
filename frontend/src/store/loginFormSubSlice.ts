import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TLoginFormState = {
  email: string | null,
  password: string | null
};

const initialState: TLoginFormState = {
  email: null,
  password: null,
};

const loginFormSubSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeEmailLogin: (state, action: PayloadAction<string>) => ({
      ...state, email: action.payload,
    }),
    changePasswordLogin: (state, action: PayloadAction<string>) => ({
      ...state, password: action.payload,
    }),
    resetFormLogin: (state) => ({
      ...state, ...initialState,
    }),
  },
});

const loginReducer = loginFormSubSlice.reducer;
export default loginReducer;
export const { changeEmailLogin, changePasswordLogin, resetFormLogin } = loginFormSubSlice.actions;
