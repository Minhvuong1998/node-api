import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import {
  ExtractJwt,
  Strategy,
  StrategyOptions
} from 'passport-jwt';
import { UNAUTHORIZED } from 'http-status';
import { Error } from '../factory/error';
import { statics } from '../factory';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(
    'jwt'
  ),
  secretOrKey:
    process.env.JWT_SECRET || 'project-blog-secret-key'
};

export const strategy = new Strategy(
  options,
  async (jwtPayload, done) => {
    done(null, jwtPayload);
  }
);

export const jwtAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err, user) => {
      if (err) {
        next(err);
      } else if (!user) {
        next(
          new Error(
            UNAUTHORIZED,
            statics.message.unauthorized
          )
        );
      } else {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
};
