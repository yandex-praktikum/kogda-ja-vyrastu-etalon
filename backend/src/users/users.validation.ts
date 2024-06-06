import { celebrate, Joi, Segments } from 'celebrate';
import { Role } from '../types/role';

export interface CreateUserBody {
  email: string;
  username: string;
  password: string;
  nickname: string;
}

export const validateCreateUserRequest = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(16).required(),
    nickname: Joi.string().alphanum().min(3).max(16).required(),
    password: Joi.string().required(),
  },
});

export interface UpdateUserBody {
  nickname?: string;
  username?: string;
  email?: string;
  bio?: string;
  password?: string;
  role?: Role[];
}

export const validateUpdateUserRequest = celebrate({
  [Segments.BODY]: {
    nickname: Joi.string().alphanum().min(3).max(16).optional(),
    username: Joi.string().min(3).max(16).optional(),
    email: Joi.string().email().optional(),
    bio: Joi.string().min(3).max(100).optional(),
    password: Joi.string().optional(),
    role: Joi.array()
      .items(Joi.string().valid(...Object.values(Role)))
      .optional(),
  },
});

export const validateFindByUsernameRequest = celebrate({
  [Segments.PARAMS]: {
    username: Joi.string().alphanum().min(3).max(16).required(),
  },
});
