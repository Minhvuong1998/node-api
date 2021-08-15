import * as UserFactory from './main/user';

export namespace User {
  export import attributes = UserFactory.IUserAttributes;
  export import searchParams = UserFactory.ISearchParams;
}

export namespace Auth {
  export import paramsLogin = UserFactory.TParamsLogin;
  export import LoginData = UserFactory.ILoginData;
  export import ParamsRegister = UserFactory.TParamsRegister;
}
