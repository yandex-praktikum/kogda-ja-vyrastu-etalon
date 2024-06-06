import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import {
  followProfileDeleteRequested,
  followProfileDeleteSucceeded,
  followProfileDeleteFailed,
  setViewProfile,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import { unsubscribeFromUser } from '../services/api/subscriptions';

const unfollowProfileThunk: AppThunk = () => async (dispatch, getState) => {
  const { profile } = getState().view;

  if (!profile) {
    return;
  }

  dispatch(followProfileDeleteRequested());
  try {
    await unsubscribeFromUser(profile.id);

    batch(() => {
      dispatch(setViewProfile({ ...profile, isCurrentUserSubscribed: false }));
      dispatch(followProfileDeleteSucceeded());
    });
  } catch (error) {
    dispatch(followProfileDeleteFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default unfollowProfileThunk;
