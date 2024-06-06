import { celebrate, Joi, Segments } from 'celebrate';

export interface CreateCommentBody {
  parent?: string;
  body: string;
}

export const validateCreateCommentRequest = celebrate({
  [Segments.BODY]: {
    parent: Joi.string().optional(),
    body: Joi.string().required(),
  },
});

export type UpdateCommentBody = Omit<CreateCommentBody, 'parent'>;

export const validateUpdateCommentRequest = celebrate({
  [Segments.BODY]: {
    body: Joi.string().required(),
  },
});
