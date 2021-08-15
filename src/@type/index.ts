/**
 * user info will be added by authentication middleware
 * define interface of req.user
 */
import { types } from '../factory';

declare global {
  namespace Express {
    interface User extends types.Auth.LoginData {}
  }
}
