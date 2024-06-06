import { HttpError } from './Base';

export class ForbiddenError extends HttpError {
  constructor() {
    super('Forbidden', 403);
  }
}
