import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const valiResult = validationResult(req);
  if (!valiResult.isEmpty()) {
    try {
      const error = valiResult
        .array({ onlyFirstError: true })
        .map((err) => {
          return {
            field: err.param,
            message: err.msg
          };
        });

      res.status(BAD_REQUEST).json(error);
    } catch (err) {
      res.status(BAD_REQUEST).json(err.message);
    }
  } else {
    next();
  }
};
