import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.types';
import { post as createUser } from '../services/api/users';
import { post as login } from '../services/api/auth-tokens';
import * as auth from '../services/auth';

import {
  userRegistrationRequested,
  userRegistrationSucceeded,
  userRegistrationFailed,
  setUser,
} from '../store';

import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const registerThunk: AppThunk = () => async (dispatch, getState) => {
  const reg = getState().forms.register || {};
  const usernameReg = reg.username ?? '';
  const emailReg = reg.email ?? '';
  const passwordReg = reg.password ?? '';
  const nicknameReg = reg.nickname ?? '';

  dispatch(userRegistrationRequested());
  try {
    const user = await createUser({
      username: usernameReg, email: emailReg, password: passwordReg, nickname: nicknameReg,
    });

    const tokens = await login({ email: emailReg, password: passwordReg });

    auth.set(tokens);

    batch(() => {
      dispatch(setUser(user));
      dispatch(userRegistrationSucceeded());
    });
  } catch (error) {
    dispatch(
      userRegistrationFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default registerThunk;
