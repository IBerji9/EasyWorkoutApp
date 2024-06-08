"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const Public = () => (0, common_1.SetMetadata)(config_1.IS_PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=auth.decorator.js.map