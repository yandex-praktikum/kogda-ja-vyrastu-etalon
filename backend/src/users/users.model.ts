import * as bcrypt from 'bcrypt';
import { model, Schema, Types } from 'mongoose';
import { Role } from '../types/role';

export interface IUser {
  id: Types.ObjectId;

  email: string;

  roles: Role[];

  username: string;

  nickname: string | null;

  bio: string | null;

  image: string | null;

  password: string;

  salt: string;

  tagsSubscriptions: Types.ObjectId[];

  usersSubscriptions: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  roles: {
    type: [String],
    enum: Object.values(Role),
    default: [Role.User, Role.Admin],
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  nickname: {
    type: String,
  },

  bio: {
    type: String,
  },

  image: {
    type: String,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  salt: {
    type: String,
    required: true,
    select: false,
  },

  tagsSubscriptions: {
    type: [Schema.Types.ObjectId],
    ref: 'tags',
  },

  usersSubscriptions: {
    type: [Schema.Types.ObjectId],
    ref: 'users',
  },
});

const UserModel = model<IUser>('users', userSchema);

export type UserModel = typeof UserModel & {
  hashPassword: (password: string, salt: string) => Promise<string>;
};

const TypedUserModel = UserModel as UserModel;

TypedUserModel.hashPassword = function (password: string, salt: string) {
  return bcrypt.hash(password, salt);
};

export { TypedUserModel as UserModel };
