import { AxiosError } from 'axios';
import { TAPIError } from '../services/api.types';
import { Article } from '../services/api/articles';
import { addArticleToFavourites } from '../services/api/favourites';
import { makeErrorObject } from '../services/helpers';
import {
  likeArticlePostFailed,
  likeArticlePostRequested,
  likeArticlePostSucceeded,
  setViewArticle,
  setViewFeed,
} from '../store';
import { AppThunk } from '../store/store.types';

const addLikeThunk: AppThunk = (articleId: number) => async (dispatch, getState) => {
  try {
    dispatch(likeArticlePostRequested());

    const response = await addArticleToFavourites(articleId);
    const newArticle = response.data as Article;

    const articles = getState().view.feed ?? [];
    const articleView = getState().view.article;

    if (articleView) {
      dispatch(
        setViewArticle({
          ...newArticle,
        }),
      );
    }

    dispatch(setViewFeed(articles.map(
      (item) => (
        item.id === articleId
          ? newArticle
          : item
      ),
    )));
    dispatch(likeArticlePostSucceeded());
  } catch (error) {
    dispatch(likeArticlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default addLikeThunk;
