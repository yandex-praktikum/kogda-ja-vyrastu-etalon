import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  articlePostRequested,
  articlePostSucceeded,
  articlePostFailed,
} from '../store';
import { post as createArticle } from '../services/api/articles';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import makeTagList from '../services/helpers/make-tagList';

const postArticleThunk: AppThunk = () => async (dispatch, getState) => {
  dispatch(articlePostRequested());
  const articleData = getState().forms.article ?? {};
  const {
    title, description, body, image, tags,
  } = articleData;

  if (!title || !description || !body) {
    throw new Error('Can\'t save article');
  }

  const tagList = makeTagList(tags || '');

  try {
    await createArticle({
      title,
      description,
      body,
      image: image ?? undefined,
      tags: tagList,
    });
    dispatch(articlePostSucceeded());
  } catch (error) {
    dispatch(
      articlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default postArticleThunk;
