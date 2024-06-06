import { NextFunction, Request, Response } from 'express';
import { ServerError } from '../errors/ServerError';
import { NotFoundError } from '../errors/NotFound';
import { CreateTagBody } from './tags.validation';
import { QueryOptions, Types } from 'mongoose';
import type { ArticleModel } from '../articles/articles.model';
import { BadRequestError } from '../errors/BadRequest';
import type { ITag, TagModel } from './tags.model';
import { FiltersQuery, SortOption } from '../common/validation';

export class TagsController {
  constructor(private tagModel: TagModel, private articleModel: ArticleModel) {}

  create = async (
    req: Request<object, ITag, CreateTagBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const { label } = req.body;

    try {
      const tag = await this.tagModel.create({
        label,
      });

      res.status(201).send(tag);
    } catch (err) {
      if (err.code === 11000) {
        return next(new BadRequestError('Tag already exists'));
      }

      next(new ServerError());
    }
  };

  findAll = async (
    req: Request<object, ITag[], object, FiltersQuery>,
    res: Response,
  ) => {
    const { limit = 20, offset = 0, sort } = req.query;

    const options: QueryOptions<ITag> = {
      limit,
      skip: offset,
    };

    switch (sort) {
      case SortOption.Popular:
      case SortOption.Recent:
      default:
        options.sort = { createdAt: -1 };
        break;
    }

    const tags = await this.tagModel.find({}, {}, options);

    res.send(tags);
  };

  findOne = async (
    req: Request<{ id: string }, ITag>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    const tag = await this.tagModel.findById(new Types.ObjectId(id));

    if (!tag) {
      return next(new NotFoundError());
    }

    return res.send(tag);
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    const tag = await this.tagModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });

    if (!tag) {
      next(new NotFoundError());
    }

    await this.articleModel.updateMany(
      { tags: tag.id },
      { $pullAll: { tags: tag.id } },
    );

    res.status(200).send();
  };

  findArticles = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const articles = await this.articleModel.find({
      tags: new Types.ObjectId(id),
    });

    res.status(200).send(articles);
  };
}
