import { model, Schema } from 'mongoose';

export interface ITag {
  id: string;

  label: string;

  createdAt: Date;
}

const tagSchema = new Schema<ITag>(
  {
    label: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const TagModel = model<ITag>('tags', tagSchema);

export type TagModel = typeof TagModel;
