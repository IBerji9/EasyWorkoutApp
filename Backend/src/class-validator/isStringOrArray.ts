import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isString, isArray } from 'lodash';

@ValidatorConstraint({ name: 'string-or-number', async: false })
export class IsArrayOrString implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return isString(value) || isArray(value);
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) must be array string or string';
  }
}
