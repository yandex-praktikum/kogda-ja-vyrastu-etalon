import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { patch as updateUser, UpdateUserDto } from '../services/api/users';
import {
  settingsPatchFailed,
  settingsPatchRequested,
  settingsPatchSucceeded,
  setUser,
  resetFormProfile,
} from '../store';

import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const patchCurrentUserThunk: AppThunk = () => async (dispatch, getState) => {
  dispatch(settingsPatchRequested());
  const profile = getState().forms.profile ?? {};
  const { id } = getState().profile;
  // Type Guards
  const userData: UpdateUserDto = {
    username: profile.username || undefined,
    email: profile.email || undefined,
    bio: profile.bio || undefined,
    image: profile.image || undefined,
    nickname: profile.nickname || undefined,
  };

  if (profile.password) {
    userData.password = profile.password;
  }
  try {
    const user = await updateUser(id, userData);

    batch(() => {
      dispatch(setUser(user));
      dispatch(resetFormProfile());
      dispatch(settingsPatchSucceeded());
    });
  } catch (error) {
    dispatch(settingsPatchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default patchCurrentUserThunk;
