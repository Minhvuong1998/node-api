import BaseController from './baseController';
import { NextFunction, Request, Response } from 'express';
import mongoDB from '../config/mongoDB';
import { repository } from '../domain';
import { CREATED, OK } from 'http-status';
import { pick } from 'lodash';

class AuthController extends BaseController {
  protected readonly userRepo: repository.authRepo;

  constructor(db: typeof mongoDB) {
    super(db);
    this.userRepo = new repository.authRepo(db);
    this.login = this.nextWrapper(this.login);
    this.register = this.nextWrapper(this.register);
    this.uploadFile = this.nextWrapper(this.uploadFile);
  }

  public login = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const user = await this.userRepo.login(
      pick(req.body, ['email', 'password'])
    );
    res.status(OK).json(user);
  };

  public register = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const user = await this.userRepo.create(
      pick(req.body, [
        'name',
        'email',
        'password',
        'authority'
      ])
    );
    res.status(CREATED).json(user);
  };

  public uploadFile = async (
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    res.json('ok');
  };
}

export default new AuthController(mongoDB);
