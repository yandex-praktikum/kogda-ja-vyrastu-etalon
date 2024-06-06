import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.types';
import { post as createComment } from '../services/api/comments';
import {
  commentPostRequested,
  commentPostSucceeded,
  commentPostFailed,
  setViewCommentsFeed,
  resetComment,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const createCommentThunk: AppThunk = (articleId: number) => async (dispatch, getState) => {
  const body = getState().forms.comment.comment ?? '';
  const comments = getState().view.commentsFeed ?? [];

  try {
    if (!body) {
      return;
    }

    dispatch(commentPostRequested());

    const comment = await createComment(articleId, { body });

    batch(() => {
      dispatch(setViewCommentsFeed([comment, ...comments]));
      dispatch(resetComment());
      dispatch(commentPostSucceeded());
    });
  } catch (error) {
    dispatch(commentPostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default createCommentThunk;
