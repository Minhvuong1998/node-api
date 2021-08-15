import { INTERNAL_SERVER_ERROR } from 'http-status';
import { message as mess } from '../static';

export default class BlogError extends Error {
  public status: number;
  constructor(
    status: number = INTERNAL_SERVER_ERROR,
    message: string = mess.systemError
  ) {
    super(message);
    this.status = status;
  }
}
