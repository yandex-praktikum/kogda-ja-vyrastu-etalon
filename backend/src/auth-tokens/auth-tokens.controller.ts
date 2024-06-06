import { NextFunction, Request, Response } from 'express';
import { CreateAuthTokenBody } from './auth-tokens.validation';
import type { AuthTokenModel } from './auth-tokens.model';
import { IUser, UserModel } from '../users/users.model';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import { ForbiddenError } from '../errors/Forbidden';
import { BadRequestError } from '../errors/BadRequest';

interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: 'bearer';
}

export class AuthTokensController {
  constructor(
    private authTokenModel: AuthTokenModel,
    private userModel: UserModel,
  ) {}

  create = async (
    req: Request<object, AuthTokens, CreateAuthTokenBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;

    const user = await this.userModel
      .findOne({ email })
      .select('+password +salt');

    const hashedPassword = await UserModel.hashPassword(password, user?.salt);

    if (user?.password !== hashedPassword) {
      return next(new ForbiddenError());
    }

    const tokens = this.generateTokens(user);

    await this.saveRefreshToken(user, tokens);

    res.status(200).send(tokens);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] as string;
    const token = authHeader.replace('Bearer ', '');
    const entity = await this.authTokenModel
      .findOne({ token })
      .populate('user');

    if (!entity) {
      return next(new BadRequestError('Token is invalid'));
    }

    const tokens = this.generateTokens(entity.user);

    await this.saveRefreshToken(entity.user, tokens);

    res.status(200).send(tokens);
  };

  revoke = async (req: Request, res: Response) => {
    await this.authTokenModel.deleteOne({ user: req.user.id });

    res.status(200).send();
  };

  private async saveRefreshToken(user: IUser, tokens: AuthTokens) {
    await this.authTokenModel.updateOne(
      { user: user.id },
      { user: user.id, token: tokens.refresh_token },
      { upsert: true },
    );
  }

  private generateTokens(user: IUser): AuthTokens {
    const accessToken = jwt.sign(
      { username: user.username },
      config.get('jwt.accessSecret'),
      {
        expiresIn: parseInt(config.get('jwt.accessTtl')),
        subject: user.id.toString(),
      },
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      config.get('jwt.refreshSecret'),
      {
        expiresIn: parseInt(config.get('jwt.refreshTtl')),
        subject: user.id.toString(),
      },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 60 * 50,
      token_type: 'bearer',
    };
  }
}
