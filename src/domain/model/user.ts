import { Schema, Document, Mongoose } from 'mongoose';
import { types, statics } from '../../factory';
import { timestamp } from './common';

export const User = (mongoose: Mongoose) => {
  const UserSchema = new mongoose.Schema(
    {
      email: {
        type: Schema.Types.String,
        required: true
      },
      name: {
        type: Schema.Types.String,
        required: true
      },
      password: {
        type: Schema.Types.String,
        required: true
      },
      loginLast: {
        type: Schema.Types.Date,
        required: false
      },
      authority: {
        type: Schema.Types.Number,
        required: true,
        enum: [
          statics.User.Authority.USER,
          statics.User.Authority.ADMIN
        ],
        default: statics.User.Authority.USER
      },
      disableFlag: {
        type: Schema.Types.Number,
        required: true,
        enum: [
          statics.Common.DisableFlag.No,
          statics.Common.DisableFlag.Yes
        ],
        default: statics.Common.DisableFlag.No
      }
    },
    {
      toJSON: {
        virtuals: true
      },
      id: true,
      versionKey: false
    }
  ).plugin(timestamp);

  return mongoose.model<Document & types.User.attributes>(
    'user',
    UserSchema,
    'user'
  );
};
