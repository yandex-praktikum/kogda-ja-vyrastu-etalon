import { Joi } from 'celebrate';

export enum SortOption {
  Recent = 'recent',

  Popular = 'popular',
}

export interface FiltersQuery {
  limit?: number;

  offset?: number;

  sort?: SortOption;
}

export const filtersQueryValidationSchema = {
  limit: Joi.number().min(0).max(50).optional().default(20),
  offset: Joi.number().min(0).optional().default(0),
  sort: Joi.string()
    .valid(...Object.values(SortOption))
    .default(SortOption.Recent)
    .optional(),
};
