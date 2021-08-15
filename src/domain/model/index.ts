import { User } from './user';
import { Mongoose } from 'mongoose';

export type Conllections = ReturnType<typeof initialize>;

export const initialize = (mongoose: Mongoose) => {
  const model = {
    User: User(mongoose)
  };

  return {
    ...model,
    mongoose
  };
};
