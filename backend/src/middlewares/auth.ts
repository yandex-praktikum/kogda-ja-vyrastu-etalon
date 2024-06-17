import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Model, Types } from 'mongoose';
import config from '../config';
import { ForbiddenError } from '../errors/Forbidden';
import { NotFoundError } from '../errors/NotFound';
import { UnauthorizedError } from '../errors/Unauthorized';
import { Role } from '../types/role';
import { UserModel } from '../users/users.model';

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

  res.locals.user = user;

  next();
}

export function roleGuardMiddleware(...roles: Role[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!res.locals.user) {
      return next(new UnauthorizedError());
    }

    const hasAccess = roles.some((role) => res.locals.user.roles.includes(role));

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

    if (!res.locals.user) {
      return next(new UnauthorizedError());
    }

    if (res.locals.user.roles.includes(Role.Admin)) {
      return next();
    }

    const entity = await model.findById(id);

    if (!entity) {
      return next(new NotFoundError());
    }

    const userEntityId = entity[userProperty] as Types.ObjectId;
    const hasAccess = new Types.ObjectId(res.locals.user.id).equals(userEntityId);

    if (!hasAccess) {
      return next(new ForbiddenError());
    }

    next();
  };
}
