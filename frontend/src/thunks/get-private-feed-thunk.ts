import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import {
  privateFeedFailed,
  privateFeedRequested,
  privateFeedSucceeded,
  setViewFeed,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import { Article, ArticlesQueryFilter, getFeed } from '../services/api/articles';

const getPrivateFeedThunk: AppThunk = (
  params: ArticlesQueryFilter,
) => async (dispatch) => {
  try {
    batch(() => {
      dispatch(privateFeedRequested());
    });
    const articles = await getFeed(params);
    batch(() => {
      dispatch(setViewFeed(articles as unknown as Article[]));
      dispatch(privateFeedSucceeded());
    });
  } catch (error) {
    dispatch(privateFeedFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getPrivateFeedThunk;
