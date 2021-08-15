import { NextFunction, Request, Response } from 'express';
import { NOT_FOUND } from 'http-status';
import { statics } from '../factory';
import { UNAUTHORIZED } from 'http-status';

export default (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.status === UNAUTHORIZED) {
    res.status(err.status).json({
      status: err.status,
      message: err.message
    });
  } else if (err.status === 400 || err.status === 404) {
    res.status(err.status).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(NOT_FOUND).json({
      status: NOT_FOUND,
      message: statics.message.notFound
    });
  }
};
