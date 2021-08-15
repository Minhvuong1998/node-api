import { Types } from 'mongoose';
export interface ICommonAttributes {
  id: Types.ObjectId;
  created_at?: Date;
  created_by?: Types.ObjectId;
  updated_at?: Date;
  updated_by?: Types.ObjectId;
  deleted_at?: Date;
  deleted_by?: Types.ObjectId;
}

export enum DisableFlag {
  Yes = 0,
  No = 1
}
