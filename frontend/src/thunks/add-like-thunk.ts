import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  setViewFeed,
  likeArticlePostRequested,
  likeArticlePostSucceeded,
  likeArticlePostFailed,
  setViewArticle,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import { addArticleToFavourites } from '../services/api/favourites';

const addLikeThunk: AppThunk = (articleId: number) => async (dispatch, getState) => {
  try {
    dispatch(likeArticlePostRequested());

    await addArticleToFavourites(articleId);

    const articles = getState().view.feed ?? [];
    const articleView = getState().view.article;

    if (articleView) {
      dispatch(
        setViewArticle({
          ...articleView, favoredByCurrentUser: true, favoredCount: articleView.favoredCount + 1,
        }),
      );
    }

    dispatch(setViewFeed(articles.map(
      (item) => (
        item.id === articleId
          ? { ...item, favoredByCurrentUser: true, favoredCount: item.favoredCount + 1 }
          : item
      ),
    )));
    dispatch(likeArticlePostSucceeded());
  } catch (error) {
    dispatch(likeArticlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default addLikeThunk;
