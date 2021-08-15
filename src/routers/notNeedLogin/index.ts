import express from 'express';
import authRouter from './authRouter';

const routerNotNeedLogin = express.Router();

routerNotNeedLogin.use('/auth', authRouter);

export default routerNotNeedLogin;
