import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { UserModel } from '../users/users.model';
import { AuthTokensController } from './auth-tokens.controller';
import { AuthTokenModel } from './auth-tokens.model';
import {
  validateCreateAuthTokensRequest,
  validateUpdateAuthTokensRequest,
} from './auth-tokens.validation';

const AUTH_TOKENS_PATH = '/auth-tokens';

const controller = new AuthTokensController(AuthTokenModel, UserModel);

const authTokensRouter = Router();

authTokensRouter.post(
  AUTH_TOKENS_PATH,
  validateCreateAuthTokensRequest,
  controller.create,
);
authTokensRouter.patch(
  AUTH_TOKENS_PATH,
  validateUpdateAuthTokensRequest,
  controller.update,
);
authTokensRouter.delete(AUTH_TOKENS_PATH, authMiddleware, controller.revoke);

export default authTokensRouter;
