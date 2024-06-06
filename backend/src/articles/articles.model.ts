import { model, Schema, Types } from 'mongoose';
import { PublishState } from '../../src/types/publish-state';
import { IUser } from '../users/users.model';
import type { ITag } from '../tags/tags.model';
import slugify from 'slugify';

export interface IArticle {
  id: string;

  image: string;

  slug: string;

  title: string;

  description: string;

  body: string;

  link: string;

  createdAt: Date;

  updatedAt: Date;

  author: IUser;

  state: PublishState;

  tags: ITag;

  favoredBy: Types.ObjectId[];

  favoredCount: number;

  favoredByCurrentUser: boolean;
}

const articleSchema = new Schema<IArticle>(
  {
    image: {
      type: String,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
      unique: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },

    state: {
      type: String,
      enum: Object.values(PublishState),
      required: true,
      default: PublishState.Draft,
    },

    tags: {
      type: [Schema.Types.ObjectId],
      ref: 'tags',
    },

    favoredBy: {
      type: [Schema.Types.ObjectId],
      ref: 'users',
      default: [],
    },

    favoredCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

articleSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slug =
      slugify(this.title, { lower: true }) +
      '-' +
      new Date()
        .toLocaleDateString('en-us', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, '-');
  }
  this.link = `/article/${this.slug}`;

  next();
});

export const ArticleModel = model<IArticle>('articles', articleSchema);

export type ArticleModel = typeof ArticleModel;
