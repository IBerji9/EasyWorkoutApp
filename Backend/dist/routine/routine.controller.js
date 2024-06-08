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
exports.RoutineController = void 0;
const common_1 = require("@nestjs/common");
const routine_service_1 = require("./routine.service");
const create_routine_dto_1 = require("./dto/create-routine.dto");
const update_routine_dto_1 = require("./dto/update-routine.dto");
const routine_entity_1 = require("./entities/routine.entity");
const response_interceptor_1 = require("../response/response.interceptor");
const query_routine_dto_1 = require("./dto/query-routine.dto");
let RoutineController = class RoutineController {
    constructor(routineService) {
        this.routineService = routineService;
    }
    async create(createDto, request) {
        try {
            const id = await this.routineService.create({
                ...createDto,
                user_id: request.user.id,
                date_recorded: new Date(),
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
            const response = await this.routineService.findAll(params);
            return {
                data: response.map((item) => new routine_entity_1.Routine(item)),
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findOne(id) {
        try {
            const response = await this.routineService.findOne(id);
            return {
                data: new routine_entity_1.Routine(response),
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async update(id, updateDto) {
        try {
            const response = await this.routineService.update(id, updateDto);
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
            const response = await this.routineService.remove(id);
            return {
                data: response,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
exports.RoutineController = RoutineController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_routine_dto_1.CreateRoutineDto, Object]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_routine_dto_1.QueryRoutineDto]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_routine_dto_1.UpdateRoutineDto]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "remove", null);
exports.RoutineController = RoutineController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, common_1.Controller)('routine'),
    __metadata("design:paramtypes", [routine_service_1.RoutineService])
], RoutineController);
//# sourceMappingURL=routine.controller.js.map