import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  articleFetchRequested,
  articleFetchSucceeded,
  articleFetchFailed,
  setViewArticle,
  setArticleFetchNotFound,
} from '../store';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import { getBySlug } from '../services/api/articles';

const getArticleThunk: AppThunk = (slug: string) => async (dispatch) => {
  dispatch(articleFetchRequested());
  try {
    const article = await getBySlug(slug);
    batch(() => {
      dispatch(setViewArticle(article));
      dispatch(articleFetchSucceeded());
    });
  } catch (error) {
    const { response } = error as AxiosError<TAPIError>;
    if (response && response?.status === 404) {
      dispatch(setArticleFetchNotFound());
    }
    dispatch(articleFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getArticleThunk;
