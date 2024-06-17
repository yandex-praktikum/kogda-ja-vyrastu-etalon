import { AxiosError } from 'axios';
import { TAPIError } from '../services/api.types';
import { patch as updateArticle } from '../services/api/articles';
import { makeErrorObject } from '../services/helpers';
import makeTagList from '../services/helpers/make-tagList';
import {
  articlePatchFailed,
  articlePatchRequested,
  articlePatchSucceeded,
} from '../store';
import { AppThunk } from '../store/store.types';

const patchArticleThunk: AppThunk = (articleId: number) => async (dispatch, getState) => {
  dispatch(articlePatchRequested());
  const articleData = getState().forms.article ?? {};
  const {
    title, description, body, tags, image,
  } = articleData;

  const tagList = makeTagList(tags || '');

  try {
    await updateArticle(articleId, {
      title: title ?? undefined,
      description: description ?? undefined,
      body: body ?? undefined,
      image: image ?? undefined,
      tags: tagList,
    });
    dispatch(articlePatchSucceeded());
  } catch (error) {
    dispatch(
      articlePatchFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default patchArticleThunk;
