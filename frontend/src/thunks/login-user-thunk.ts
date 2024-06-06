import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import {
  userLoginRequested,
  userLoginSucceeded,
  userLoginFailed, setUser, onLogin, resetFormLogin,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import { post as login } from '../services/api/auth-tokens';
import { set } from '../services/auth';
import { getCurrentUser } from '../services/api/users';

const loginUserThunk : AppThunk = () => async (dispatch, getState) => {
  const loginData = getState().forms.login ?? {};
  try {
    dispatch(userLoginRequested());

    const tokens = await login({ email: loginData?.email ?? '', password: loginData?.password ?? '' });

    set(tokens);

    const user = await getCurrentUser();

    batch(() => {
      dispatch(userLoginSucceeded());
      dispatch(setUser(user));
      dispatch(onLogin());
      dispatch(resetFormLogin());
    });
  } catch (error) {
    dispatch(userLoginFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default loginUserThunk;
