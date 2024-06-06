import { AxiosError, AxiosResponse } from 'axios';
import { batch } from 'react-redux';
import {
  followProfilePostRequested,
  followProfilePostSucceeded,
  followProfilePostFailed,
  setViewProfile,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import { subscribeToUser } from '../services/api/subscriptions';

const followProfileThunk: AppThunk = () => async (dispatch, getState) => {
  const { profile } = getState().view;

  if (!profile) {
    return;
  }

  dispatch(followProfilePostRequested());
  try {
    await subscribeToUser(profile.id);

    batch(() => {
      dispatch(setViewProfile({ ...profile, isCurrentUserSubscribed: true }));
      dispatch(followProfilePostSucceeded());
    });
  } catch (error) {
    dispatch(followProfilePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default followProfileThunk;
