import { body, Validator } from './custom';

export const login = [
  body('email', [
    Validator.required,
    Validator.maxLength(50)
  ]),
  body('password', [
    Validator.required,
    Validator.maxLength(50)
  ])
];

export const register = [
  body('name', [
    Validator.required,
    Validator.maxLength(50)
  ]),
  body('password', [
    Validator.required,
    Validator.maxLength(50)
  ]),
  body('email', [
    Validator.required,
    Validator.maxLength(50)
  ])
];

export const uploadFile = [
  body('file', [
    Validator.fileRequired,
    Validator.typeFile(['jpg', 'png'])
  ])
];
