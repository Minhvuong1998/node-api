import express from 'express';
import cors from 'cors';
import { CorsOptions } from 'cors';
import router from './routers';
import path from 'path';
import { initialize } from 'passport';
import { NextFunction, Request, Response } from 'express';

const corsOptions: CorsOptions = {
  origin: '*',
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization'
  ],
  methods: [
    'GET',
    'HEAD',
    'OPTIONS',
    'PUT',
    'PATCH',
    'POST',
    'DELETE'
  ],
  optionsSuccessStatus: 200,
  credentials: true,
  preflightContinue: false
};
const app = express();
app.use(initialize());
app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use('/v1/', router);
app.use(
  '/public',
  express.static(path.resolve(`${__dirname}../public`), {
    index: false
  })
);
app.use(
  (_req: Request, res: Response, _next: NextFunction) => {
    res.json('fail');
  }
);
export default app;
