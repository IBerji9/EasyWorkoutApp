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
exports.ProgressController = void 0;
const common_1 = require("@nestjs/common");
const progress_service_1 = require("./progress.service");
const create_progress_dto_1 = require("./dto/create-progress.dto");
const update_progress_dto_1 = require("./dto/update-progress.dto");
const response_interceptor_1 = require("../response/response.interceptor");
const progress_entity_1 = require("./entities/progress.entity");
const query_progress_dto_1 = require("./dto/query-progress.dto");
let ProgressController = class ProgressController {
    constructor(progressService) {
        this.progressService = progressService;
    }
    async create(createDto, request) {
        try {
            const id = await this.progressService.create({
                ...createDto,
                date_recorded: new Date(),
                user_id: request.user.id,
            });
            return {
                data: id,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findAll(params) {
        try {
            const response = await this.progressService.findAll(params);
            return {
                data: response.map((item) => new progress_entity_1.Progress(item)),
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findOne(id) {
        try {
            const response = await this.progressService.findOne(id);
            return {
                data: new progress_entity_1.Progress(response),
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async update(id, updateDto) {
        try {
            const response = await this.progressService.update(id, updateDto);
            return {
                data: response,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async remove(id) {
        try {
            const response = await this.progressService.remove(id);
            return {
                data: response,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
exports.ProgressController = ProgressController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_progress_dto_1.CreateProgressDto, Object]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_progress_dto_1.QueryProgressDto]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_progress_dto_1.UpdateProgressDto]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "remove", null);
exports.ProgressController = ProgressController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, common_1.Controller)('progress'),
    __metadata("design:paramtypes", [progress_service_1.ProgressService])
], ProgressController);
//# sourceMappingURL=progress.controller.js.map