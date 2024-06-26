"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOrString = void 0;
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
let IsArrayOrString = class IsArrayOrString {
    validate(value, args) {
        return (0, lodash_1.isString)(value) || (0, lodash_1.isArray)(value);
    }
    defaultMessage(args) {
        return '($value) must be array string or string';
    }
};
exports.IsArrayOrString = IsArrayOrString;
exports.IsArrayOrString = IsArrayOrString = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'string-or-number', async: false })
], IsArrayOrString);
//# sourceMappingURL=isStringOrArray.js.map