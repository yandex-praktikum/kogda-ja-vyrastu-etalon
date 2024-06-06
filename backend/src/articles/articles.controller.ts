import { NextFunction, Request, Response } from 'express';
import type { ArticleModel, IArticle } from './articles.model';
import {
  CreateArticleBody,
  GetArticlesQuery,
  UpdateArticleBody,
} from './articles.validation';
import { ServerError } from '../errors/ServerError';
import { NotFoundError } from '../errors/NotFound';
import type { ITag, TagModel } from '../tags/tags.model';
import { Types, FilterQuery, QueryOptions } from 'mongoose';
import type { UserModel } from '../users/users.model';
import { FiltersQuery, SortOption } from '../common/validation';

export class ArticlesController {
  constructor(
    private articleModel: ArticleModel,
    private tagModel: TagModel,
    private userModel: UserModel,
  ) {}

  create = async (
    req: Request<object, IArticle, CreateArticleBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const { title, slug, description, body, tags = [] } = req.body;

    try {
      let tagsEntities: ITag[] = [];

      if (tags.length) {
        tagsEntities = await this.tagModel.create(
          tags.map((tag) => ({ label: tag })),
          { ordered: false },
        );
      }

      const article = await this.articleModel.create({
        author: new Types.ObjectId(req.user.id),
        title,
        slug,
        description,
        body,
        tags: tagsEntities.map((tag) => tag.id),
      });

      res.status(201).send(article);
    } catch (err) {
      console.log(err);
      next(new ServerError());
    }
  };

  findAll = async (
    req: Request<object, IArticle[], object, GetArticlesQuery>,
    res: Response,
  ) => {
    const {
      limit = 20,
      offset = 0,
      sort,
      tags,
      author,
      isFavourite,
    } = req.query;

    const filter: FilterQuery<IArticle> = {};

    if (tags) {
      filter.tags = { $all: tags };
    }

    if (author) {
      const authorEntity = await this.userModel.findOne({ username: author });

      filter.author = authorEntity.id;
    }

    if (isFavourite && req.user) {
      filter.favoredBy = req.user.id;
    }

    const options: QueryOptions<IArticle> = {
      limit,
      skip: offset,
    };

    switch (sort) {
      case SortOption.Popular:
        options.sort = { favoredCount: -1 };
        break;
      case SortOption.Recent:
      default:
        options.sort = { createdAt: -1 };
        break;
    }

    const articles = await this.articleModel
      .find(filter, {}, options)
      .populate('author')
      .populate('tags');

    res.send(articles);
  };

  getFeed = async (
    req: Request<object, IArticle[], object, FiltersQuery>,
    res: Response,
  ) => {
    const { limit = 20, offset = 0, sort } = req.query;

    const filter: FilterQuery<IArticle> = {
      author: {
        $in: req.user.usersSubscriptions,
      },
    };

    const options: QueryOptions<IArticle> = {
      limit,
      skip: offset,
    };

    switch (sort) {
      case SortOption.Popular:
        options.sort = { favoredCount: -1 };
        break;
      case SortOption.Recent:
      default:
        options.sort = { createdAt: -1 };
        break;
    }

    const articles = await this.articleModel
      .find(filter, {}, options)
      .populate('author')
      .populate('tags');

    res.send(articles);
  };

  findOne = async (
    req: Request<{ id: string }, IArticle>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    const article = await this.articleModel
      .findOne({ _id: new Types.ObjectId(id) })
      .populate('author')
      .populate('tags');

    if (!article) {
      return next(new NotFoundError());
    }

    return res.send(article);
  };

  findOneBySlug = async (
    req: Request<{ slug: string }, IArticle>,
    res: Response,
    next: NextFunction,
  ) => {
    const { slug } = req.params;

    const article = await this.articleModel
      .findOne({ slug })
      .populate('author')
      .populate('tags');

    if (!article) {
      return next(new NotFoundError());
    }

    return res.send(article);
  };

  update = async (
    req: Request<{ id: string }, IArticle, UpdateArticleBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const body = req.body;

    if (body.tags.length) {
      const tags = await this.tagModel.create(
        body.tags.map((tag) => ({ label: tag })),
        { ordered: false },
      );

      body.tags = tags.map((tag) => tag.id);
    }

    const article = await this.articleModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      body,
      { new: true },
    );

    if (!article) {
      next(new NotFoundError());
    }

    res.send(article);
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    const article = await this.articleModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });

    if (!article) {
      next(new NotFoundError());
    }

    res.status(200).send();
  };

  likeArticle = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const article = await this.articleModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      {
        $addToSet: { favoredBy: req.user.id },
        $inc: { favoredCount: 1 },
      },
    );

    if (!article) {
      return next(new NotFoundError());
    }

    return res.status(201).send();
  };

  removeLike = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const article = await this.articleModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      {
        $pull: { favoredBy: req.user.id },
        $inc: { favoredCount: -1 },
      },
    );

    if (!article) {
      return next(new NotFoundError());
    }

    return res.status(200).send();
  };
}
