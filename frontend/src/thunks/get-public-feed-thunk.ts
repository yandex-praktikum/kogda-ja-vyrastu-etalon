import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { TAPIError } from '../services/api.types';
import { ArticlesQueryFilter, getAll } from '../services/api/articles';
import { makeErrorObject } from '../services/helpers';
import {
  publicFeedFailed,
  publicFeedRequested,
  publicFeedSucceeded,
  setViewFeed,
} from '../store';
import { AppThunk } from '../store/store.types';

const getPublicFeedThunk: AppThunk = (
  params: ArticlesQueryFilter,
) => async (dispatch, getState) => {
  try {
    const { view: { feed } } = getState();

    batch(() => {
      dispatch(publicFeedRequested());
    });
    const articles = await getAll({ offset: (feed ?? []).length, ...params });
    batch(() => {
      if (params?.tags?.length) {
        dispatch(setViewFeed([...articles]));
      } else {
        dispatch(setViewFeed([...(feed ?? []), ...articles]));
      }
      dispatch(publicFeedSucceeded());
    });
  } catch (error) {
    dispatch(publicFeedFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getPublicFeedThunk;
