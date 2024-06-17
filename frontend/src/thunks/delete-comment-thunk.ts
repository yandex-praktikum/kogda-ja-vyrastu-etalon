import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { TAPIError } from '../services/api.types';
import { remove as deleteComment } from '../services/api/comments';
import { makeErrorObject } from '../services/helpers';
import {
  commentDeleteFailed,
  commentDeleteRequested,
  commentDeleteSucceeded,
  setViewCommentsFeed,
} from '../store';
import { AppThunk } from '../store/store.types';

const deleteCommentThunk: AppThunk = (
  articleId: number,
  commentId: number,
) => async (dispatch, getState) => {
  dispatch(commentDeleteRequested());
  const { view: { commentsFeed } } = getState();
  try {
    const { status } = await deleteComment(articleId, commentId);

    if (status) {
      batch(() => {
        dispatch(commentDeleteSucceeded());
        dispatch(setViewCommentsFeed(
          commentsFeed?.filter((comment) => comment.id !== commentId) ?? [],
        ));
      });
    } else {
      dispatch(commentDeleteFailed({ errors: { 'Unexpected error': `Server replied with code ${status}` }, statusCode: status }));
    }
  } catch (error) {
    dispatch(commentDeleteFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default deleteCommentThunk;
