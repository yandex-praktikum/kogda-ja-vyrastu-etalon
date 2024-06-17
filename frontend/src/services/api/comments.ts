import { Article } from './articles';
import createInstance from './createInstance';
import { User } from './users';

export interface Comment {
  id: number;

  parent?: Comment;

  children?: Comment[];

  body: string;

  author: User;

  article?: Article;

  createdAt: Date;
}

const commentsAPI = createInstance('/articles');

export interface CreateCommentDto {
  parent?: number;

  body: string;
}

export const post = (articleId: number, createCommentDto: CreateCommentDto) => commentsAPI.post<Comment>(`/${articleId}/comments`, createCommentDto).then(({ data }) => data);

export const getAll = (articleId: number) => commentsAPI.get<Comment[]>(`/${articleId}/comments`).then(({ data }) => data);

export const remove = (articleId: number, commentId: number) => commentsAPI.delete<Comment>(`/${articleId}/comments/${commentId}`);
