import express from 'express';
import userRouter from './user';

const routerNeedLogin = express.Router();

routerNeedLogin.use('/user', userRouter);

export default routerNeedLogin;
