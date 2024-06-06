import { NextFunction, Request, Response } from 'express';
import type { CommentModel, IComment } from './comments.model';
import { ServerError } from '../errors/ServerError';
import { NotFoundError } from '../errors/NotFound';
import { CreateCommentBody, UpdateCommentBody } from './comments.validation';
import { Types } from 'mongoose';
import { ArticleModel } from '../articles/articles.model';
import { BadRequestError } from '../errors/BadRequest';

export class CommentsController {
  constructor(
    private commentModel: CommentModel,
    private articleModel: ArticleModel,
  ) {}

  create = async (
    req: Request<{ articleId: string }, IComment, CreateCommentBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const { articleId } = req.params;
    const { parent, body } = req.body;

    try {
      const article = await this.articleModel.findById(articleId);

      if (!article) {
        return next(new BadRequestError('Article doesnt exist'));
      }

      const comment = new this.commentModel({
        author: new Types.ObjectId(req.user.id),
        article: articleId,
        body,
      });

      if (parent) {
        comment.parent = new Types.ObjectId(parent);

        const parentComment = await this.commentModel.findOne({ _id: parent });

        parentComment.children.push(comment);

        await parentComment.save();
      }

      res.status(201).send(await comment.save());
    } catch (err) {
      console.log(err);
      next(new ServerError());
    }
  };

  findAll = async (
    req: Request<{ articleId: string }, IComment[]>,
    res: Response,
  ) => {
    const { articleId } = req.params;

    const comments = await this.commentModel
      .find({ article: new Types.ObjectId(articleId), parent: null })
      .populate('author')
      .populate('children.author');

    res.send(comments);
  };

  findOne = async (
    req: Request<{ articleId: string; id: string }, IComment>,
    res: Response,
    next: NextFunction,
  ) => {
    const { articleId, id } = req.params;

    const comment = await this.commentModel
      .findOne({
        _id: new Types.ObjectId(id),
        article: new Types.ObjectId(articleId),
      })
      .populate('author');

    if (!comment) {
      return next(new NotFoundError());
    }

    return res.send(comment);
  };

  update = async (
    req: Request<
      { articleId: string; id: string },
      IComment,
      UpdateCommentBody
    >,
    res: Response,
    next: NextFunction,
  ) => {
    const { articleId, id } = req.params;

    const comment = await this.commentModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id), article: new Types.ObjectId(articleId) },
      req.body,
      { new: true },
    );

    if (!comment) {
      next(new NotFoundError());
    }

    res.send(comment);
  };

  delete = async (
    req: Request<{ articleId: string; id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { articleId, id } = req.params;

    const comment = await this.commentModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
      article: new Types.ObjectId(articleId),
    });

    if (comment.parent) {
      const parent = await this.commentModel.findById(comment.parent);

      parent.children = parent.children.filter(
        (child) => !comment._id.equals(child.id),
      );

      await parent.save();
    }

    if (!comment) {
      next(new NotFoundError());
    }

    res.status(200).send();
  };
}
