import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  profileFetchRequested,
  profileFetchFailed,
  profileFetchSucceeded,
  setViewProfile, setProfileFetchNotFound,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import { getByUsername } from '../services/api/users';

const getUserProfileThunk: AppThunk = (username: string) => async (dispatch) => {
  try {
    dispatch(profileFetchRequested());

    const user = await getByUsername(username);

    dispatch(setViewProfile(user));
    dispatch(profileFetchSucceeded());
  } catch (error) {
    const { response } = error as AxiosError<TAPIError>;

    if (response && response?.status === 404) {
      dispatch(setProfileFetchNotFound());
    }

    dispatch(profileFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default getUserProfileThunk;
