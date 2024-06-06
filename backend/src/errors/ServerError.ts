import { HttpError } from './Base';

export class ServerError extends HttpError {
  constructor() {
    super('Server error', 500);
  }
}
