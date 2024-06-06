import { Article } from './api/articles';

export type TUser = {
  email: string;
  username: string;
  bio?: string;
  image?:string;
};

export type TProfile = {
  following: boolean;
  image?: string;
  username: string;
  email: string;
  bio?: string;
};

export type TTags = Array<string>;

export type TArticle = {
  author: TProfile;
  body: string;
  createdAt: string;
  description: string;
  link?: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: TTags;
  title: string;
  updatedAt: string;
};

export type TArticleCore = {
  title: string;
  description: string;
  body: string;
  tagList: TTags;
};

export type TArticles = Array<TArticle>;

export type TComment = {
  id: string;
  body: string;
  createdAt: string;
  author: TProfile;
};

export type TComments = Array<TComment>;

export interface IComparator {
  (articleOne: Article, articleTwo: Article) : number;
}
