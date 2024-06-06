import { Router } from 'express';
import { CommentsController } from './comments.controller';
import { CommentModel } from './comments.model';
import {
  validateCreateCommentRequest,
  validateUpdateCommentRequest,
} from './comments.validation';
import { ArticleModel } from '../articles/articles.model';
import {
  authMiddleware,
  currentUserAccessMiddleware,
} from '../middlewares/auth';

const COMMENTS_PATH = '/articles/:articleId/comments';

const controller = new CommentsController(CommentModel, ArticleModel);
const commentsRouter = Router();

commentsRouter.get(COMMENTS_PATH, controller.findAll);
commentsRouter.get(COMMENTS_PATH + '/:id', controller.findOne);

commentsRouter.post(
  COMMENTS_PATH,
  authMiddleware,
  validateCreateCommentRequest,
  controller.create,
);
commentsRouter.patch(
  COMMENTS_PATH + '/:id',
  authMiddleware,
  validateUpdateCommentRequest,
  currentUserAccessMiddleware(CommentModel, 'id', 'author'),
  controller.update,
);
commentsRouter.delete(
  COMMENTS_PATH + '/:id',
  authMiddleware,
  currentUserAccessMiddleware(CommentModel, 'id', 'author'),
  controller.delete,
);

export default commentsRouter;
