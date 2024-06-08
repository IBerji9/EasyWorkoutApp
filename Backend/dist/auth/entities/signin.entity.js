"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninEntity = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
class SigninEntity extends user_entity_1.User {
    constructor(partial) {
        super(partial);
        Object.assign(this, partial);
    }
}
exports.SigninEntity = SigninEntity;
//# sourceMappingURL=signin.entity.js.map