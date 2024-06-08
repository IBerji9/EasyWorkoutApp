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
exports.WorkoutController = void 0;
const common_1 = require("@nestjs/common");
const workout_service_1 = require("./workout.service");
const create_workout_dto_1 = require("./dto/create-workout.dto");
const update_workout_dto_1 = require("./dto/update-workout.dto");
const workout_entity_1 = require("./entities/workout.entity");
const response_interceptor_1 = require("../response/response.interceptor");
const query_workout_dto_1 = require("./dto/query-workout.dto");
let WorkoutController = class WorkoutController {
    constructor(workoutService) {
        this.workoutService = workoutService;
    }
    async create(createDto, request) {
        try {
            const id = await this.workoutService.create({
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
            const response = await this.workoutService.findAll(params);
            return {
                data: response.map((item) => new workout_entity_1.Workout(item)),
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findOne(id) {
        try {
            const response = await this.workoutService.findOne(id);
            return {
                data: new workout_entity_1.Workout(response),
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async update(id, updateDto) {
        try {
            const response = await this.workoutService.update(id, updateDto);
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
            const response = await this.workoutService.remove(id);
            return {
                data: response,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
exports.WorkoutController = WorkoutController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workout_dto_1.CreateWorkoutDto, Object]),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_workout_dto_1.QueryWorkoutDto]),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_workout_dto_1.UpdateWorkoutDto]),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "remove", null);
exports.WorkoutController = WorkoutController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, common_1.Controller)('workout'),
    __metadata("design:paramtypes", [workout_service_1.WorkoutService])
], WorkoutController);
//# sourceMappingURL=workout.controller.js.map