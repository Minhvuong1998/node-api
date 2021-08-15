import { Conllections } from '../model';
import BaseRepository from './baseRepository';
import { types, statics } from '../../factory';
import * as jwt from 'jsonwebtoken';
import { pick } from 'lodash';
import * as crypto from 'crypto';

export default class AuthRepository extends BaseRepository {
  private readonly jwtSecret: string =
    process.env.JWT_SECRET || 'project-blog-secret-key';
  private readonly expiresIn: string =
    process.env.JWT_EXPIRATION || '3600s';
  public readonly model: Conllections['User'];
  constructor(db: Conllections) {
    super(db);
    this.model = db.User;
  }

  public async create(params: types.Auth.ParamsRegister) {
    params.password = this.hash(params.password);
    const user = await this.model.create({
      ...params,
      expire: new Date()
    });
    return {
      email: user.email,
      id: user.id,
      name: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }

  public async login(params: types.Auth.paramsLogin) {
    const user = await this.model
      .findOne({ email: params.email })
      .select('email name id password');
    const pass = this.hash(params.password);
    if (user && user.password === pass) {
      const data = pick(user.toJSON(), [
        'id',
        'email',
        'name'
      ]);
      const token = jwt.sign(data, this.jwtSecret, {
        expiresIn: this.expiresIn
      });
      return <types.Auth.LoginData>{
        ...data,
        token
      };
    }
    throw new Error(statics.message.loginFailure);
  }

  private hash(data: string) {
    return crypto
      .createHmac(
        'sha256',
        <string>process.env.HASH_SECRET!
      )
      .update(data)
      .digest('hex')
      .toString();
  }
}
