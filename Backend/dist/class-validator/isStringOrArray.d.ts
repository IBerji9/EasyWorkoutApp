import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsArrayOrString implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): any;
    defaultMessage(args: ValidationArguments): string;
}
