import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/Base';
import { CelebrateError, isCelebrateError } from 'celebrate';

function formatCelebrateError(err: CelebrateError) {
  const details = Array.from(err.details.values());

  return `${err.message}: ${details.map(e => e.message).join(', ')}`;
}

export function errorsHandler(
  err: HttpError | CelebrateError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  let status: number;
  let message: string;

  if (isCelebrateError(err)) {
    status = 400;
    message = formatCelebrateError(err);
  } else {
    status = err.status;
    message = err.message;
  }

  return res.status(status).send({ message, status });
}
