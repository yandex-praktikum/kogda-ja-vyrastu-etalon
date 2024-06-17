import { celebrate, Joi, Segments } from 'celebrate';
import {
  FiltersQuery,
  filtersQueryValidationSchema,
} from '../common/validation';

export interface CreateArticleBody {
  title: string;
  slug: string;
  description: string;
  body: string;
  image?: string,
  tags: string[];
}

export const validateCreateArticleRequest = celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    slug: Joi.string().optional(),
    description: Joi.string().required(),
    body: Joi.string().required(),
    image: Joi.string().uri().optional(),
    tags: Joi.array().items(Joi.string().min(1)).optional(),
  },
});

export type UpdateArticleBody = Partial<CreateArticleBody>;

export const validateUpdateArticleRequest = celebrate({
  [Segments.BODY]: {
    title: Joi.string().optional(),
    slug: Joi.string().optional(),
    description: Joi.string().optional(),
    body: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    tags: Joi.array().items(Joi.string().min(1)).optional(),
  },
});

export interface GetArticlesQuery extends FiltersQuery {
  author?: string;
  tags?: string[];
  isFavourite?: boolean;
}

export const validateGetArticlesRequest = celebrate({
  [Segments.QUERY]: {
    author: Joi.string().min(1).optional(),

    tags: Joi.array().items(Joi.string().min(1)).optional(),

    isFavourite: Joi.boolean().optional(),

    ...filtersQueryValidationSchema,
  },
});

export const validateGetArticleBySlugRequest = celebrate({
  [Segments.PARAMS]: {
    slug: Joi.string().required(),
  },
});
