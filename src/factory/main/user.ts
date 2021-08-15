import { Types } from 'mongoose';
import { ICommonAttributes, DisableFlag } from './common';

export interface IUserAttributes extends ICommonAttributes {
  email: string;
  name: string;
  password: string;
  token: string;
  expire: Date;
  authority: number;
  disableFlag: number;
}

export type TParamsLogin = {
  email: string;
  password: string;
};

export interface ILoginData {
  email: string;
  name: string;
  token: string;
  authority: number;
  id: Types.ObjectId;
}

export enum Authority {
  ADMIN = 0,
  USER = 1
}

export type TParamsRegister = {
  email: string;
  name: string;
  password: string;
  authority: string | number;
};

export type ISearchParams = {
  name?: string;
  email?: string;
  authority?: string[] | number[] | string;
  disableFlag?: string[] | number[] | string;
  skip?: number | string;
};
