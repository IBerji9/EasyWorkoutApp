"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateError = void 0;
const lodash_1 = require("lodash");
const generateError = (error) => {
    console.log("error", error);
    if (error.errors) {
        return (0, lodash_1.join)(error.errors.map((it) => it?.ValidationErrorItem?.message || it?.message), '-');
    }
    return error.original.message || error.message;
};
exports.generateError = generateError;
//# sourceMappingURL=generate-error.js.map