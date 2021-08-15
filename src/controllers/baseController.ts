import { NextFunction, Request, Response } from 'express';
import mongoDB from '../config/mongoDB';
import { BAD_REQUEST } from 'http-status';

export default abstract class BaseController {
  protected readonly db: typeof mongoDB;

  constructor(db: typeof mongoDB) {
    this.db = db;
  }

  protected nextWrapper(
    mainFunction: (
      req: Request,
      res: Response,
      next?: NextFunction
    ) => Promise<void>
  ) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        await mainFunction(req, res, next);
      } catch (err) {
        res.status(BAD_REQUEST).json({
          message: err.message
        });
      }
    };
  }
}
