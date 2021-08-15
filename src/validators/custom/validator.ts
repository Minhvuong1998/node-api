import { ValidationChain } from 'express-validator';
import { statics } from '../../factory';

export const required = (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .exists({ checkNull: true })
    .withMessage(
      statics.messageValidate.required(fieldName)
    );

export const maxLength = (length: number) => (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .isLength({ max: length })
    .withMessage(
      statics.messageValidate.maxlength(fieldName, length)
    );

export const fileRequired = (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .custom((_, { req }) => {
      if (req.file === undefined) {
        return false;
      }
      return true;
    })
    .withMessage(
      statics.messageValidate.required(fieldName)
    );

export const typeFile = (type: string[]) => (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .custom((_, { req }) => {
      const typeFile = String(req.file.originalname).split(
        '.'
      );
      if (type.indexOf(typeFile[typeFile.length - 1]) < 0) {
        return false;
      }
      return true;
    })
    .withMessage(
      statics.messageValidate.uploadFileType(
        fieldName,
        type.join(' ')
      )
    );
