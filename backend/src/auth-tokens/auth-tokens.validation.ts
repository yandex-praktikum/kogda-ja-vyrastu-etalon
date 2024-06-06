import { celebrate, Joi, Segments } from 'celebrate';

export interface CreateAuthTokenBody {
  email: string;
  password: string;
}

export const validateCreateAuthTokensRequest = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

export const validateUpdateAuthTokensRequest = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});
