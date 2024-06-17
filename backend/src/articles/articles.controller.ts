import { NextFunction, Request, Response } from 'express';
import { FilterQuery, QueryOptions, Types } from 'mongoose';
import { FiltersQuery, SortOption } from '../common/validation';
import { NotFoundError } from '../errors/NotFound';
import { ServerError } from '../errors/ServerError';
import type { ITag, TagModel } from '../tags/tags.model';
import type { UserModel } from '../users/users.model';
import type { ArticleModel, IArticle } from './articles.model';
import {
  CreateArticleBody,
  GetArticlesQuery,
  UpdateArticleBody,
} from './articles.validation';

export class ArticlesController {
  constructor(
    private articleModel: ArticleModel,
    private tagModel: TagModel,
    private userModel: UserModel,
  ) { }

  updateAndCreateTags = async (bodyTags: string[]) => {
      const oldTags = await this.tagModel.find({label: {"$in": bodyTags  }})
      const labelOldTags = oldTags.map((tag) => tag.label);
      const setLabelOldTags = new Set<string>(labelOldTags);
      const updateTag = bodyTags.filter((tag)  =>!setLabelOldTags.has(tag));
      
      let tagsEntities: ITag[] = [];

      if(updateTag.length)  {
        tagsEntities = await this.tagModel.create(
          updateTag.map((tag) => ({ label: tag })),
          { ordered: false },
        );
      } 

      return [... oldTags.map(tag => tag.id), ...tagsEntities.map((tag)  =>  tag.id)];
  }

  create = async (
    req: Request<object, IArticle, CreateArticleBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const { title, slug, description, body, tags = [], image } = req.body;
    try {
      let tagsEntity: string[]  = [];
      if (tags.length){
        tagsEntity = await this.updateAndCreateTags(tags)
      }
      const article = await this.articleModel.create({
        author: new Types.ObjectId(res.locals.user.id),
        title,
        slug,
        description,
        body,
        image,
        tags: tagsEntity,
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
    next: NextFunction,
  ) => {
    try {
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
        const tagsEntity = await this.tagModel.find({label: {"$in": tags  }})
        const tagsIds = tagsEntity.map((tag) => tag.id);
        console.log(tagsIds);
        
        filter.tags = { $in: tagsIds };
        console.log(filter)
      }

      if (author) {
        const authorEntity = await this.userModel.findOne({ username: author });
        console.log(author);
        filter.author = authorEntity.id;
      }

      if (isFavourite) {
        console.log(isFavourite);
        filter.favoredBy = isFavourite;
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
        .populate('tags')
        .populate('author')

      res.send(articles);
    } catch (error) {
      next(error);
    }

  };

  getFeed = async (
    req: Request<object, IArticle[], object, FiltersQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { limit = 20, offset = 0, sort } = req.query;

      const filter: FilterQuery<IArticle> = {
        author: {
          $in: res.locals.user.usersSubscriptions,
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
    } catch (error) {
      next(error);
    }
  };

  findOne = async (
    req: Request<{ id: string; }, IArticle>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      const article = await this.articleModel
        .findOne({ _id: new Types.ObjectId(id) })
        .populate('author')
        .populate('tags');

      if (!article) {
        return next(new NotFoundError());
      }
      return res.send(article);
    } catch (error) {
      next(error);
    }

  };

  findOneBySlug = async (
    req: Request<{ slug: string; }, IArticle>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { slug } = req.params;

      const article = await this.articleModel
        .findOne({ slug })
        .populate('author')
        .populate('tags');

      if (!article) {
        return next(new NotFoundError());
      }

      return res.send(article);
    } catch (error) {
      next(error);
    }

  };

  update = async (
    req: Request<{ id: string; }, IArticle, UpdateArticleBody>,
    res: Response,
    next: NextFunction,
  ) => {
    console.log(req.body);
    
    try {
      const { id } = req.params;
      const body = req.body;

      if (body.tags.length){
        body.tags = await this.updateAndCreateTags(body.tags)
      }
      
      const article = await this.articleModel.findOneAndUpdate(
        { _id: new Types.ObjectId(id) },
        body,
        { new: true, runValidators: true },
      ).orFail(() => new NotFoundError());

      res.send(article);
    } catch (error) {
      next(error);
    }

  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      const article = await this.articleModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
      });

      if (!article) {
        next(new NotFoundError());
      }

      res.status(200).send();
    } catch (error) {
      next(error);
    }

  };

  likeArticle = async (
    req: Request<{ id: string; }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const article = await this.articleModel.findOneAndUpdate(
        { _id: new Types.ObjectId(id) },
        {
          $addToSet: { favoredBy: res.locals.user.id },
          $inc: { favoredCount: 1 },
        },{
          new: true
        }
      ).populate(['author', 'tags']);

      if (!article) {
        return next(new NotFoundError());
      }

      return res.status(201).send(article);
    } catch (error) {
      next(error);
    }

  };

  removeLike = async (
    req: Request<{ id: string; }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const article = await this.articleModel.findOneAndUpdate(
        { _id: new Types.ObjectId(id) },
        {
          $pull: { favoredBy: res.locals.user.id },
          $inc: { favoredCount: -1 },
        },{
          new: true
        }
      ).populate(['author', 'tags']);

      if (!article) {
        return next(new NotFoundError());
      }

      return res.status(200).send(article);
    } catch (error) {
      next(error);
    }
  };
}
