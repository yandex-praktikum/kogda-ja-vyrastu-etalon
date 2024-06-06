import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUser, UserModel } from '../users/users.model';
import { Model, Types } from 'mongoose';
import { UnauthorizedError } from '../errors/Unauthorized';
import { ForbiddenError } from '../errors/Forbidden';
import config from '../config';
import { Role } from '../types/role';
import { NotFoundError } from '../errors/NotFound';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');

  let payload: jwt.JwtPayload;

  try {
    payload = jwt.verify(
      token,
      config.get('jwt.accessSecret'),
    ) as jwt.JwtPayload;
  } catch (err) {
    return next(new UnauthorizedError());
  }

  const user = await UserModel.findOne(
    {
      _id: new Types.ObjectId(payload.sub),
    },
    { password: 0, salt: 0 },
  );

  if (!user) {
    return next(new ForbiddenError());
  }

  req.user = user;

  next();
}

export function roleGuardMiddleware(...roles: Role[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next(new UnauthorizedError());
    }

    const hasAccess = roles.some((role) => req.user.roles.includes(role));

    if (!hasAccess) {
      return next(new ForbiddenError());
    }

    next();
  };
}

export function currentUserAccessMiddleware<T>(
  model: Model<T>,
  idProperty: string,
  userProperty: keyof T,
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const id = req.params[idProperty];

    if (!req.user) {
      return next(new UnauthorizedError());
    }

    if (req.user.roles.includes(Role.Admin)) {
      return next();
    }

    const entity = await model.findById(id);

    if (!entity) {
      return next(new NotFoundError());
    }

    const userEntityId = entity[userProperty] as Types.ObjectId;
    const hasAccess = new Types.ObjectId(req.user.id).equals(userEntityId);

    if (!hasAccess) {
      return next(new ForbiddenError());
    }

    next();
  };
}
