import { Router } from 'express';
import { AuthTokensController } from './auth-tokens.controller';
import { UserModel } from '../users/users.model';
import {
  validateCreateAuthTokensRequest,
  validateUpdateAuthTokensRequest,
} from './auth-tokens.validation';
import { AuthTokenModel } from './auth-tokens.model';
import { authMiddleware } from '../middlewares/auth';

const AUTH_TOKENS_PATH = '/auth-tokens';

const controller = new AuthTokensController(AuthTokenModel, UserModel);

const authTokensRouter = Router();

authTokensRouter.post(
  AUTH_TOKENS_PATH,
  validateCreateAuthTokensRequest,
  controller.create,
);
authTokensRouter.put(
  AUTH_TOKENS_PATH,
  validateUpdateAuthTokensRequest,
  controller.update,
);
authTokensRouter.delete(AUTH_TOKENS_PATH, authMiddleware, controller.revoke);

export default authTokensRouter;
