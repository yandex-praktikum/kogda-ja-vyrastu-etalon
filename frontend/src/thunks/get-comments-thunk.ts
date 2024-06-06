import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { getAll as getAllComments } from '../services/api/comments';
import {
  setViewCommentsFeed, commentsFetchSucceeded, commentsFetchFailed, commentsFetchRequested,
} from '../store';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const getComments: AppThunk = (articleId: number) => async (dispatch) => {
  dispatch(commentsFetchRequested());
  try {
    const comments = await getAllComments(articleId);

    batch(() => {
      dispatch(setViewCommentsFeed(comments));
      dispatch(commentsFetchSucceeded());
    });
  } catch (error) {
    dispatch(commentsFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getComments;
