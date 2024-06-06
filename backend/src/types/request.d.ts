import type { IUser } from '../users/users.model';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Request {
      user?: IUser;
    }
  }
}
