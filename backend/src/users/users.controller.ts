import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { BadRequestError } from '../errors/BadRequest';
import { NotFoundError } from '../errors/NotFound';
import { ServerError } from '../errors/ServerError';
import { SubscriptionType } from '../types/subscription-type';
import { IUser, UserModel } from './users.model';
import type { CreateUserBody } from './users.validation';

export class UsersController {
  constructor(private userModel: UserModel) { }

  create = async (
    req: Request<object, Omit<IUser, 'password' | 'salt'>, CreateUserBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, username, password, nickname } = req.body;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await UserModel.hashPassword(password, salt);

      const user = await this.userModel.create({
        email,
        username,
        password: hashedPassword,
        salt,
        nickname,
      });

      // copy to remove password and salt
      const copy = user.toObject();

      delete copy.password;
      delete copy.salt;

      res.status(201).send(copy);
    } catch (err) {
      if (err.code === 11000) {
        return next(new BadRequestError('User already exists'));
      }

      return next(new ServerError());
    }
  };

  findAll = async (
    req: Request<object, Omit<IUser, 'password' | 'salt'>[]>,
    res: Response,
  ) => {
    const users = await this.userModel.find();

    return res.send(users);
  };

  findCurrentUser = async (
    req: Request<object, Omit<IUser, 'password' | 'salt'>>,
    res: Response,
  ) => {
    return res.status(200).send(res.locals.user);
  };

  findOne = async (
    req: Request<{ id: string; }, Omit<IUser, 'password' | 'salt'>>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    const user = await this.userModel.findOne({ _id: new Types.ObjectId(id) });

    if (!user) {
      return next(new NotFoundError());
    }

    return res.send(user);
  };

  findByUsername = async (
    req: Request<{ username: string; }, Omit<IUser, 'password' | 'salt'>>,
    res: Response,
    next: NextFunction,
  ) => {
    const { username } = req.params;

    const user = await this.userModel.findOne({ username });

    if (!user) {
      return next(new NotFoundError());
    }

    return res.send(user);
  };

  update = async (
    req: Request<{ id: string; }, Omit<IUser, 'password' | 'salt'>>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const { nickname, bio, password, roles } = req.body;

      await this.userModel.updateOne(
        { _id: new Types.ObjectId(id) },
        { nickname, bio, password, roles },
      );

      return this.findOne(req, res, next);
    } catch (error) {
      next(error);
    }

  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    try {
      await this.userModel.deleteOne({ _id: new Types.ObjectId(id) });
    } catch (e) {
      return next(new ServerError());
    }

    res.status(200).send();
  };

  addSubscription =
    (type: SubscriptionType) =>
      async (req: Request<{ id: string; }>, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params;

          await this.userModel.updateOne(
            {
              _id: res.locals.user.id,
            },
            {
              $addToSet: {
                [type === SubscriptionType.Tag
                  ? 'tagsSubscriptions'
                  : 'usersSubscriptions']: new Types.ObjectId(id),
              },
            },
          );

          return res.status(201).send();
        } catch (error) {
          next(error);
        }
      };
  removeSubscription =
    (type: SubscriptionType) =>
      async (req: Request<{ id: string; }>, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params;

          await this.userModel.updateOne(
            {
              _id: res.locals.user.id,
            },
            {
              $pull: {
                [type === SubscriptionType.Tag
                  ? 'tagsSubscriptions'
                  : 'usersSubscriptions']: new Types.ObjectId(id),
              },
            },
          );

          return res.status(201).send();
        } catch (error) {
          next(error);
        }
      };
}
