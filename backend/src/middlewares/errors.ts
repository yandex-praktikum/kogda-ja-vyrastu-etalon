import { CelebrateError, isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/Base';

function formatCelebrateError(err: CelebrateError) {
  console.log('CelebrateError', CelebrateError);
  const details = Array.from(err?.details?.values());

  
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
    console.log('err', err )
    status = err?.status || 500;
    message = err.message ||  'Internal Server Error';
  }

  return res.status(status).send({ message, status });
}
