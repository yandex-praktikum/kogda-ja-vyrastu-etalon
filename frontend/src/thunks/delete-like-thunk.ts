import { AxiosError } from 'axios';
import { TAPIError } from '../services/api.types';
import { Article } from '../services/api/articles';
import { removeArticleFromFavourites } from '../services/api/favourites';
import { makeErrorObject } from '../services/helpers';
import {
  likeArticleDeleteFailed,
  likeArticleDeleteRequested,
  likeArticleDeleteSucceeded,
  setViewArticle,
  setViewFeed,
} from '../store';
import { AppThunk } from '../store/store.types';

const deleteLikeThunk: AppThunk = (articleId: number) => async (dispatch, getState) => {
  try {
    dispatch(likeArticleDeleteRequested());

    const response = await removeArticleFromFavourites(articleId);
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
    dispatch(setViewFeed(
      articles.map(
        (item) => (
          item.id === articleId
            ? newArticle
            : item
        ),
      ),
    ));
    dispatch(likeArticleDeleteSucceeded());
  } catch (error) {
    dispatch(likeArticleDeleteFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default deleteLikeThunk;
