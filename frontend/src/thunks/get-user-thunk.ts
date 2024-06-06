import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.types';
import {
  userFetchRequested,
  userFetchSucceeded,
  userFetchFailed,
  setUser, onLogin,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import { getCurrentUser } from '../services/api/users';

const getUserProfileThunk: AppThunk = () => async (dispatch) => {
  dispatch(userFetchRequested());
  try {
    const user = await getCurrentUser();

    batch(() => {
      dispatch(setUser(user));
      dispatch(userFetchSucceeded());
      dispatch(onLogin());
    });
  } catch (error) {
    dispatch(userFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default getUserProfileThunk;
