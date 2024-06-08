"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../config");
const user_service_1 = require("../user/user.service");
const mail_service_1 = require("../mail/mail.service");
const signin_entity_1 = require("./entities/signin.entity");
const user_enum_1 = require("../user/entities/user.enum");
const generate_password_1 = require("generate-password");
let AuthService = class AuthService {
    constructor(userService, jwtService, mailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async signIn(email, password) {
        try {
            const user = await this.userService.findByEmail(email);
            if (!user || !user.password) {
                throw new common_1.UnauthorizedException();
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new common_1.UnauthorizedException();
            }
            const payload = {
                email: user.email,
                role: user_enum_1.Role.USER,
                id: user.id,
            };
            return new signin_entity_1.SigninEntity({
                ...user,
                token: await this.jwtService.signAsync(payload),
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    async forgotPassword(email) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const password = (0, generate_password_1.generate)({
            length: 10,
            numbers: true,
        });
        await this.userService.update(user.id, { password });
        await this.mailService.sendForgotPassword(user.email, user.name, password);
        return config_1.message.send_email;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map