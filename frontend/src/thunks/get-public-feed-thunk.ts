import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import {
  publicFeedFailed,
  publicFeedRequested,
  publicFeedSucceeded,
  setViewFeed,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import { ArticlesQueryFilter, getAll } from '../services/api/articles';

const getPublicFeedThunk: AppThunk = (
  params: ArticlesQueryFilter,
) => async (dispatch, getState) => {
  try {
    const { view: { feed } } = getState();

    batch(() => {
      dispatch(publicFeedRequested());
    });
    const articles = await getAll({ ...params, offset: (feed ?? []).length });
    batch(() => {
      dispatch(setViewFeed([...(feed ?? []), ...articles]));
      dispatch(publicFeedSucceeded());
    });
  } catch (error) {
    dispatch(publicFeedFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getPublicFeedThunk;
