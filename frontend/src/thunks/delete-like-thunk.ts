import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  likeArticleDeleteFailed,
  likeArticleDeleteRequested,
  likeArticleDeleteSucceeded,
  setViewArticle,
  setViewFeed,
} from '../store';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import { removeArticleFromFavourites } from '../services/api/favourites';

const deleteLikeThunk: AppThunk = (articleId: number) => async (dispatch, getState) => {
  try {
    dispatch(likeArticleDeleteRequested());

    await removeArticleFromFavourites(articleId);

    const articles = getState().view.feed ?? [];
    const articleView = getState().view.article;
    if (articleView) {
      dispatch(
        setViewArticle({
          ...articleView, favoredByCurrentUser: false, favoredCount: articleView.favoredCount - 1,
        }),
      );
    }
    dispatch(setViewFeed(
      articles.map(
        (item) => (
          item.id === articleId
            ? { ...item, favoredByCurrentUser: false, favoredCount: item.favoredCount - 1 }
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
