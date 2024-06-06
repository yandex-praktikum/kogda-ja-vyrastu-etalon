import { celebrate, Joi, Segments } from 'celebrate';
import { filtersQueryValidationSchema } from '../common/validation';

export interface CreateTagBody {
  label: string;
}

export const validateCreateTagRequest = celebrate({
  [Segments.BODY]: {
    label: Joi.string().min(1).required(),
  },
});

export const validateGetTagsRequest = celebrate({
  [Segments.QUERY]: {
    ...filtersQueryValidationSchema,
  },
});
