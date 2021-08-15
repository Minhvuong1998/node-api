import express from 'express';
import authController from '@controllers/authController';
import {
  login,
  register,
  uploadFile
} from '@validators/authValidator';
import errorValidator from '@middlewares/errorValidator';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage()
});

const authRouter = express.Router();

authRouter.post(
  '/login',
  login,
  errorValidator,
  authController.login
);

authRouter.post(
  '/register',
  register,
  errorValidator,
  authController.register
);

authRouter.post(
  '/file',
  upload.single('file'),
  uploadFile,
  errorValidator,
  authController.uploadFile
);

export default authRouter;
