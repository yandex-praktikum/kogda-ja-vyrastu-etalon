import { HttpError } from './Base';

export class UnauthorizedError extends HttpError {
  constructor() {
    super('Unauthorized', 401);
  }
}
