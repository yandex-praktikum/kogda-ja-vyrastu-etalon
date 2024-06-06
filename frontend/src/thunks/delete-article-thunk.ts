import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  articleDeleteRequested,
  articleDeleteSucceeded,
  articleDeleteFailed,
  setViewFeed,
  clearViewArticle,
} from '../store';
import { remove as deleteArticle } from '../services/api/articles';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const deleteArticleThunk: AppThunk = (articleId: number) => async (dispatch, getState) => {
  dispatch(articleDeleteRequested());
  try {
    const { status } = await deleteArticle(articleId);
    if (status === 204) {
      const articles = getState().view.feed ?? [];
      batch(() => {
        dispatch(setViewFeed(articles?.filter((item) => item.id !== articleId)));
        dispatch(clearViewArticle());
        dispatch(articleDeleteSucceeded());
      });
    } else {
      dispatch(articleDeleteFailed(
        { errors: { 'Unexpected error': `Server replied with code ${status}` }, statusCode: status },
      ));
    }
  } catch (error) {
    dispatch(articleDeleteFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default deleteArticleThunk;
