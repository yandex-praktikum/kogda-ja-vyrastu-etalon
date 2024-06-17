import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { SubscriptionType } from '../types/subscription-type';
import { UsersController } from './users.controller';
import { UserModel } from './users.model';
import {
  validateCreateUserRequest,
  validateFindByUsernameRequest,
  validateUpdateUserRequest,
} from './users.validation';

const USERS_PATH = '/users';

const controller = new UsersController(UserModel);

const usersRouter = Router();

usersRouter.post(USERS_PATH, validateCreateUserRequest, controller.create);
usersRouter.get(USERS_PATH, controller.findAll);

usersRouter.get(USERS_PATH + '/me', authMiddleware, controller.findCurrentUser);
usersRouter.get(USERS_PATH + '/:id', authMiddleware, controller.findOne);
usersRouter.get(
  USERS_PATH + '/username/:username',
  authMiddleware,
  validateFindByUsernameRequest,
  controller.findByUsername,
);
usersRouter.patch(
  USERS_PATH + '/:id',
  authMiddleware,
  validateUpdateUserRequest,
  controller.update,
);
usersRouter.delete(USERS_PATH + '/:id', authMiddleware, controller.delete);
usersRouter.post(
  USERS_PATH + '/subscriptions/user/:id',
  authMiddleware,
  controller.addSubscription(SubscriptionType.User),
);
usersRouter.delete(
  USERS_PATH + '/subscriptions/user/:id',
  authMiddleware,
  controller.removeSubscription(SubscriptionType.User),
);

export default usersRouter;
