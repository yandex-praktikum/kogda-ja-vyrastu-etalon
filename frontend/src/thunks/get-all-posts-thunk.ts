import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import {
  allPostsRequested,
  allPostsRequestSucceeded,
  allPostsRequestFailed, setAllArticles,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import { Article, getAll } from '../services/api/articles';

const getAllPostsThunk: AppThunk = () => async (dispatch) => {
  try {
    dispatch(allPostsRequested());
    const articles = await getAll();
    batch(() => {
      dispatch(setAllArticles(articles as unknown as Article[]));
      dispatch(allPostsRequestSucceeded());
    });
  } catch (error) {
    dispatch(allPostsRequestFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getAllPostsThunk;
