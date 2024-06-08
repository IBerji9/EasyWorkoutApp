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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const generate_error_1 = require("../utils/generate-error");
const uuid_1 = require("uuid");
const category_enum_1 = require("./entities/category.enum");
let CategoryService = class CategoryService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async create(createDto) {
        try {
            const id = (0, uuid_1.v4)();
            await this.firebaseService.categoryCol.doc(id).set(createDto);
            return id;
        }
        catch (error) {
            throw new Error((0, generate_error_1.generateError)(error));
        }
    }
    async findAll(params) {
        try {
            let query = this.firebaseService.categoryCol;
            if (params?.type) {
                query = query.where('type', '==', params.type);
                if (params.type === category_enum_1.Type.CREATED) {
                    if (params?.user_id) {
                        query = query.where('user_id', '==', params.user_id);
                    }
                }
            }
            else {
                if (params?.user_id) {
                    query = query.where('user_id', '==', params.user_id);
                }
            }
            const document = await query.orderBy('date_recorded', 'asc').get();
            if (!document.size) {
                throw new Error('No data');
            }
            const workoutData = await this.firebaseService.workoutCol.get();
            const workouts = [];
            await workoutData.forEach((doc) => {
                workouts.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            const routineData = await this.firebaseService.routineCol.get();
            const routines = [];
            await routineData.forEach((doc) => {
                const workoutByRoutineId = workouts.filter((it) => it.routine_id === doc.id);
                routines.push({
                    id: doc.id,
                    ...doc.data(),
                    workouts: workoutByRoutineId,
                });
            });
            const datas = [];
            await document.forEach((doc) => {
                const routineByCategoryId = routines.filter((it) => it.category_id === doc.id);
                datas.push({
                    id: doc.id,
                    ...doc.data(),
                    routines: routineByCategoryId,
                });
            });
            return datas;
        }
        catch (error) {
            console.log('error', error);
            return [];
        }
    }
    async findOne(id) {
        try {
            const response = await this.firebaseService.categoryCol.doc(id).get();
            const data = response.data();
            return {
                ...data,
                id,
            };
        }
        catch (error) {
            return null;
        }
    }
    async update(id, updateDto) {
        try {
            await this.firebaseService.categoryCol.doc(id).update({ ...updateDto });
            return id;
        }
        catch (error) {
            throw new Error((0, generate_error_1.generateError)(error));
        }
    }
    async remove(id) {
        try {
            await this.firebaseService.categoryCol.doc(id).delete();
            return id;
        }
        catch (error) {
            throw new Error((0, generate_error_1.generateError)(error));
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], CategoryService);
//# sourceMappingURL=category.service.js.map