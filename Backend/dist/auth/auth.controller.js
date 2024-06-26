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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const auth_decorator_1 = require("./auth.decorator");
const user_service_1 = require("../user/user.service");
const response_interceptor_1 = require("../response/response.interceptor");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async signIn(payload) {
        const data = await this.authService.signIn(payload.email, payload.password);
        return {
            data,
        };
    }
    async forgotPassword(payload) {
        const message = await this.authService.forgotPassword(payload.email);
        return {
            message,
        };
    }
    async signup(payload) {
        if (payload.password !== payload.confirm_password) {
            throw new common_1.BadRequestException('Confirm password should match with Password');
        }
        const password = payload.password;
        await this.userService.create({ ...payload, unit: 'kg', language: 'es' });
        const data = await this.authService.signIn(payload.email, password);
        return {
            data,
        };
    }
    async changePassword(payload, request) {
        const user = await this.userService.findByEmail(request.user.email);
        if (!user) {
            throw new common_1.BadRequestException('Cannot find this user.');
        }
        if (user.password || payload.current_password) {
            const isMatch = await bcrypt.compare(payload.current_password, user.password);
            if (!isMatch) {
                return new common_1.BadRequestException('Your current password is not correct.');
            }
        }
        const data = await this.userService.update(user.id, {
            password: payload.new_password,
        });
        return {
            data,
        };
    }
    async updateProfile(payload, request) {
        const data = await this.userService.update(request.user.id, payload);
        return {
            data,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SigninDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Put)('change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map