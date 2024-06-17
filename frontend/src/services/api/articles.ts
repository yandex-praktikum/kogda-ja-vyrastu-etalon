import createInstance from './createInstance';
import { Tag } from './tags';
import { User } from './users';

export interface Article {
  id: number;

  slug: string;

  title: string;

  description: string;

  body: string;

  link: string;

  image?: string;

  createdAt: Date;

  updatedAt: Date;

  author: User;

  favoredCount: number;

  favoredBy: string[];

  tags: Tag[];
}

const articlesAPI = createInstance('/articles');
export interface ArticlesQueryFilter {

  limit?: number;

  offset?: number;

  sort?: 'recent' | 'popular';

  author?: string;

  tags?: string;

  isFavourite?: boolean;
}

export const getAll = (params?: ArticlesQueryFilter) => articlesAPI.get<Article[]>('', { params }).then(({ data }) => data);

export const getFeed = (params?: ArticlesQueryFilter) => articlesAPI.get<Article[]>('feed', { params }).then(({ data }) => data);

export const getBySlug = (slug: string) => articlesAPI.get<Article>(`/slug/${slug}`).then(({ data }) => data);

interface CreateArticleDto {
  title: string;

  slug?: string;

  description: string;

  body: string;

  image?: string;

  tags?: string[];
}

export const post = (createArticleDto: CreateArticleDto) => articlesAPI.post<Article>('', createArticleDto).then(({ data }) => data);

export const patch = (articleId: number, updateArticleDto: Partial<CreateArticleDto>) => articlesAPI.patch<Article>(`/${articleId}`, updateArticleDto).then(({ data }) => data);

export const remove = (articleId: number) => articlesAPI.delete(`/${articleId}`);
