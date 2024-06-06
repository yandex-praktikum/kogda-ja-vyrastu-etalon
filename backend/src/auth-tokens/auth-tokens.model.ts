import { model, Schema } from 'mongoose';
import type { IUser } from '../users/users.model';

export interface IAuthToken {
  token: string;

  user: IUser;
}

const authTokenSchema = new Schema<IAuthToken>({
  token: {
    type: String,
    required: true,
    expires: 60 * 30,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
});

export const AuthTokenModel = model<IAuthToken>('authTokens', authTokenSchema);

export type AuthTokenModel = typeof AuthTokenModel;
