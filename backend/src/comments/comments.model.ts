import { model, Schema, Types } from 'mongoose';
import { PublishState } from '../../src/types/publish-state';
import { IUser } from '../users/users.model';

export interface IComment {
  id: string;

  parent: Types.ObjectId;

  children: IComment[];

  article: Types.ObjectId;

  body: string;

  createdAt: Date;

  author: IUser;

  state: PublishState;

  // comments

  // tags
}

const commentSchema = new Schema<IComment>({}, { timestamps: true });

commentSchema.add({
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'comments',
  },

  children: {
    type: [commentSchema],
  },

  article: {
    type: Schema.Types.ObjectId,
    ref: 'articles',
  },

  body: {
    type: String,
    required: true,
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
});

export const CommentModel = model<IComment>('comments', commentSchema);

export type CommentModel = typeof CommentModel;
