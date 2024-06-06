import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { getAll as getAllTags, TagsQueryFilter } from '../services/api/tags';
import {
  setAllTags,
  tagsFetchFailed,
  tagsFetchRequested,
  tagsFetchSucceeded,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getAllTagsThunk : AppThunk = (params?: TagsQueryFilter) => async (dispatch) => {
  try {
    dispatch(tagsFetchRequested());

    const tags = await getAllTags(params);

    batch(() => {
      dispatch(setAllTags(tags));
      dispatch(tagsFetchSucceeded());
    });
  } catch (error) {
    dispatch(tagsFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getAllTagsThunk;
