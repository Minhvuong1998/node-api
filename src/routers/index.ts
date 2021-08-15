import express from 'express';
import errorMiddleware from '../middleware/errorMiddleware';
import notNeedLogin from './notNeedLogin';
import needLogin from './needLogin';
import passport from 'passport';
import {
  jwtAuthenticate,
  strategy
} from '../config/passport';

const router = express.Router();

passport.use(strategy);

router.use(notNeedLogin);

router.use(jwtAuthenticate, needLogin);

router.use(errorMiddleware);

export default router;
