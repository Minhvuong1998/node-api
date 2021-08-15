import express from 'express';
import userController from '@controllers/userController';

// import {
//   middlePermission,
//   apiList
// } from '@middlewares/permission';

const userRouter = express.Router();

userRouter.get(
  '/search',
  // middlePermission(apiList.userGroup),
  userController.search
);

export default userRouter;
