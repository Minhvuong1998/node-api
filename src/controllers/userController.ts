import BaseController from './baseController';
import { NextFunction, Request, Response } from 'express';
import mongoDB from '../config/mongoDB';
import { repository } from '../domain';
import { OK } from 'http-status';
import { pick } from 'lodash';
import { types } from '../factory';

class AuthController extends BaseController {
  protected readonly userRepo: repository.userRepo;

  constructor(db: typeof mongoDB) {
    super(db);
    this.userRepo = new repository.userRepo(db);
    this.search = this.nextWrapper(this.search);
  }

  public search = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const getQuery = pick(req.query, [
      'name',
      'email',
      'authority',
      'disableFlag',
      'skip'
    ]) as types.User.searchParams;
    const user = await this.userRepo.search(getQuery);
    res.status(OK).json(user);
  };
}

export default new AuthController(mongoDB);
