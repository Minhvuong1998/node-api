import {
  body as b,
  query as q,
  param as p,
  ValidationChain
} from 'express-validator';
import * as V from './validator';

export const Validator = V;

type RuleChecker = (
  check: ValidationChain,
  fieldName: string
) => ValidationChain;

const validator = (
  checkType: 'body' | 'query' | 'param',
  field: string,
  rules: RuleChecker[]
) => {
  let check = b(field);
  if (checkType === 'query') {
    check = q(field);
  } else if (checkType === 'param') {
    check = p(field);
  }

  const ruleSet: RuleChecker[] | undefined = rules;
  if (ruleSet !== undefined) {
    for (const rule of ruleSet) {
      check = rule(check, field);
    }
  }

  return check;
};

export const body = (
  field: string,
  rules: RuleChecker[]
) => {
  return validator('body', field, rules);
};

export const query = (
  field: string,
  rules: RuleChecker[]
) => {
  return validator('query', field, rules);
};

export const param = (
  field: string,
  rules: RuleChecker[]
) => {
  return validator('param', field, rules);
};
