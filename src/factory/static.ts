import * as userFactory from './main/user';
import * as commonFactory from './main/common';

export const messageValidate = {
  required: ($0: string) => `${$0} is required`,
  maxlength: ($0: string, $1: number) =>
    `${$0} is too long. Please input maximums of ${$1} characters.`,
  uploadFileType: ($0: string, $1: string) =>
    `${$0} is not in ${$1} format.`
};

export const message = {
  notFound: 'not found.',
  loginFailure: 'Email or password is incorrect',
  notAccess: 'Url has no access',
  unauthorized: 'Unauthorized error',
  systemError: 'System error'
};

export namespace User {
  export import Authority = userFactory.Authority;
}

export namespace Common {
  export import DisableFlag = commonFactory.DisableFlag;
}
