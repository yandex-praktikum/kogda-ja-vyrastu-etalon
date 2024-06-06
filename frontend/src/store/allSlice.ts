import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TThemes } from '../types/styles.types';
import themes from '../themes';
import { TVocabularies } from '../types/vocabularies.types';
import vocabularies from '../vocabularies';
import { Article } from '../services/api/articles';
import { Tag } from '../services/api/tags';

type TAllState = {
  articles: Article[] | null;
  articlesCount: number;
  tags: Tag[] | null;
  themes: TThemes,
  themesNames: Array<string>,
  vocabularies: TVocabularies,
  langNames: Array<string>,
};
const initialState : TAllState = {
  articles: null,
  articlesCount: 0,
  tags: null,
  themes,
  themesNames: Object.keys(themes),
  vocabularies,
  langNames: Object.keys(vocabularies),
};

const allSlice = createSlice({
  name: 'all',
  initialState,
  reducers: {
    setAllArticles: (state, action: PayloadAction<Article[]>) => ({
      ...state, articles: action.payload,
    }),
    setAllArticlesCount: (state, action: PayloadAction<number>) => ({
      ...state, articlesCount: action.payload,
    }),
    setAllTags: (state, action: PayloadAction<Tag[]>) => ({
      ...state, tags: action.payload,
    }),
    clearArticles: (state) => ({ ...state, articles: null }),
    clearTags: (state) => ({ ...state, tags: null }),
    clearAll: (state) => ({ ...state, articles: null, tags: null }),
    setAllThemes: (state, action: PayloadAction<TThemes>) => ({
      ...state, themes: action.payload,
    }),
    setAllVocabularies: (state, action:PayloadAction<TVocabularies>) => ({
      ...state, vocabularies: action.payload,
    }),
  },
});

const allReducer = allSlice.reducer;
export const {
  setAllArticles,
  setAllArticlesCount,
  setAllTags,
  clearArticles,
  clearTags,
  clearAll,
  setAllThemes,
  setAllVocabularies,
} = allSlice.actions;
export default allReducer;
