import { Router } from 'express';
import { ArticlesController } from './articles.controller';
import { ArticleModel } from './articles.model';
import {
  validateCreateArticleRequest,
  validateGetArticleBySlugRequest,
  validateUpdateArticleRequest,
} from './articles.validation';
import { TagModel } from '../tags/tags.model';
import {
  authMiddleware,
  currentUserAccessMiddleware,
} from '../middlewares/auth';
import { UserModel } from '../users/users.model';

const ARTICLES_PATH = '/articles';

const controller = new ArticlesController(ArticleModel, TagModel, UserModel);
const articlesRouter = Router();

articlesRouter.get(ARTICLES_PATH, controller.findAll);
articlesRouter.get(ARTICLES_PATH + '/feed', controller.getFeed);
articlesRouter.get(ARTICLES_PATH + '/:id', controller.findOne);
articlesRouter.get(
  ARTICLES_PATH + '/slug/:slug',
  validateGetArticleBySlugRequest,
  controller.findOneBySlug,
);

articlesRouter.post(
  ARTICLES_PATH,
  authMiddleware,
  validateCreateArticleRequest,
  controller.create,
);
articlesRouter.patch(
  ARTICLES_PATH + '/:id',
  authMiddleware,
  validateUpdateArticleRequest,
  currentUserAccessMiddleware(ArticleModel, 'id', 'author'),
  controller.update,
);
articlesRouter.delete(
  ARTICLES_PATH + '/:id',
  authMiddleware,
  currentUserAccessMiddleware(ArticleModel, 'id', 'author'),
  controller.delete,
);

articlesRouter.post(ARTICLES_PATH + '/:id/favourites', authMiddleware, controller.likeArticle);
articlesRouter.delete(ARTICLES_PATH + '/:id/favourites', authMiddleware, controller.removeLike);

export default articlesRouter;
