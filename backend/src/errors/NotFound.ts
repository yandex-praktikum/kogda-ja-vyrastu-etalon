import { HttpError } from './Base';

export class NotFoundError extends HttpError {
  constructor() {
    super('Not found', 404);
  }
}
