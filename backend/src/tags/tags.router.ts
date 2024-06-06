import { Router } from 'express';
import { TagsController } from './tags.controller';
import { ArticleModel } from '../articles/articles.model';
import { TagModel } from './tags.model';
import {
  validateCreateTagRequest,
  validateGetTagsRequest,
} from './tags.validation';
import { authMiddleware, roleGuardMiddleware } from '../middlewares/auth';
import { Role } from '../types/role';

const TAGS_PATH = '/tags';

const controller = new TagsController(TagModel, ArticleModel);
const tagsRouter = Router();

tagsRouter.get(TAGS_PATH, validateGetTagsRequest, controller.findAll);
tagsRouter.get(TAGS_PATH + '/:id', controller.findOne);
tagsRouter.get(TAGS_PATH + '/:id/articles', controller.findArticles);

tagsRouter.post(
  TAGS_PATH,
  authMiddleware,
  validateCreateTagRequest,
  controller.create,
);
tagsRouter.delete(
  TAGS_PATH + '/:id',
  authMiddleware,
  roleGuardMiddleware(Role.Admin),
  controller.delete,
);

export default tagsRouter;
