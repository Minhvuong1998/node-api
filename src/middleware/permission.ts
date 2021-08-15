import { statics } from '../factory';
import { NextFunction, Request, Response } from 'express';
import { FORBIDDEN } from 'http-status';

const Authority = statics.User.Authority;

const FullAccess = [Authority.ADMIN, Authority.USER];

export const apiList = {
  userGroup: 'userGroup'
};

export const permissions = {
  [apiList.userGroup]: FullAccess
};

export const middlePermission = (apiName: string) => {
  const apiPermission = permissions[apiName];
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (apiPermission.indexOf(req.user!.authority!) >= 0) {
      next();
    } else {
      res.status(FORBIDDEN).json({
        message: statics.message.notAccess
      });
    }
  };
};
