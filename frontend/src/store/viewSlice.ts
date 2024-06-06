import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  FeedTypes, UserArticlesTypes,
} from '../types/types';
import { Article } from '../services/api/articles';
import { Comment } from '../services/api/comments';
import { User } from '../services/api/users';
import { Tag } from '../services/api/tags';

type TViewState = {
  feed: Article[] | null;
  feedCount: number;
  article: Article | null;
  tagsList: Tag[] | null;
  selectedTags: Tag[] | null;
  tag: string | null,
  commentsFeed: Comment[] | null;
  comment: Comment | null;
  page: number;
  perPage: number;
  profile: User | null;
  feedType: FeedTypes;
  articlesType: UserArticlesTypes;
  topFeed: Article[] | null;
};

const initialState: TViewState = {
  feed: null,
  feedCount: 0,
  article: null,
  tagsList: null,
  selectedTags: null,
  tag: null,
  commentsFeed: null,
  comment: null,
  page: 1,
  perPage: 10,
  profile: null,
  feedType: FeedTypes.public,
  articlesType: UserArticlesTypes.my,
  topFeed: null,
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setViewFeed: (state, action: PayloadAction<Article[]>) => ({
      ...state, feed: action.payload,
    }),
    clearViewFeed: (state) => ({
      ...state, feed: null,
    }),
    setTopFeed: (state, action: PayloadAction<Article[]>) => ({
      ...state, topFeed: action.payload,
    }),
    clearTopFeed: (state) => ({
      ...state, topFeed: null,
    }),
    setFeedCount: (state, action: PayloadAction<number>) => ({
      ...state, feedCount: action.payload,
    }),
    setViewTags: (state, action: PayloadAction<Tag[]>) => ({
      ...state, tagsList: action.payload,
    }),
    clearViewTags: (state) => ({
      ...state, tagsList: null, selectedTags: null,
    }),
    setViewArticle: (state, action: PayloadAction<Article>) => ({
      ...state, article: action.payload,
    }),
    clearViewArticle: (state) => ({
      ...state, article: null,
    }),
    setSelectedTags: (state, action: PayloadAction<Tag[]>) => ({
      ...state, selectedTags: action.payload,
    }),
    clearSelectedTags: (state) => ({
      ...state, selectedTags: null,
    }),
    setTag: (state, action: PayloadAction<string>) => ({
      ...state, tag: action.payload,
    }),
    clearTag: (state) => ({
      ...state, tag: null,
    }),
    setViewCommentsFeed: (state, action: PayloadAction<Comment[]>) => ({
      ...state, commentsFeed: action.payload,
    }),
    clearViewCommentsFeed: (state) => ({
      ...state, commentsFeed: [],
    }),
    selectViewComment: (state, action: PayloadAction<Comment>) => ({
      ...state, comment: action.payload,
    }),
    clearViewComment: (state) => ({
      ...state, comment: null,
    }),
    setPage: (state, action: PayloadAction<number>) => ({
      ...state, page: action.payload,
    }),
    clearPage: (state) => ({
      ...state, page: 1,
    }),
    setPageLimit: (state, action: PayloadAction<number>) => ({
      ...state, perPage: action.payload,
    }),
    clearView: (state) => ({
      ...state, ...initialState,
    }),
    setViewProfile: (state, action: PayloadAction<User>) => ({
      ...state, profile: action.payload,
    }),
    clearViewProfile: (state) => ({
      ...state, profile: null,
    }),
    setFeedType: (state, action: PayloadAction<FeedTypes>) => ({
      ...state, feedType: action.payload,
    }),
    setArtistProfile: (state, action: PayloadAction<UserArticlesTypes>) => ({
      ...state, articlesType: action.payload,
    }),
  },
});

export const {
  clearPage,
  setViewFeed,
  clearViewFeed,
  setFeedCount,
  setViewTags,
  clearViewTags,
  setViewArticle,
  clearViewArticle,
  setSelectedTags,
  clearSelectedTags,
  setViewCommentsFeed,
  clearViewCommentsFeed,
  selectViewComment,
  clearViewComment,
  setPage,
  setPageLimit,
  clearView,
  setViewProfile,
  clearViewProfile,
  setTag,
  clearTag,
  setFeedType,
  setArtistProfile,
  setTopFeed,
  clearTopFeed,
} = viewSlice.actions;
const viewReducer = viewSlice.reducer;
export default viewReducer;
