import { HttpError } from './Base';

export class BadRequestError extends HttpError {
  constructor(message = 'BadRequest') {
    super(message, 400);
  }
}
