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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const config_1 = require("../config");
const generate_error_1 = require("../utils/generate-error");
const firebase_service_1 = require("../firebase/firebase.service");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async create(createUserDto) {
        if (createUserDto.password) {
            createUserDto.password = await bcrypt.hash(createUserDto.password, config_1.saltOrRounds);
        }
        const id = (0, uuid_1.v4)();
        try {
            await this.firebaseService.userCol.doc(id).set({ ...createUserDto });
            return id;
        }
        catch (error) {
            throw new Error((0, generate_error_1.generateError)(error));
        }
    }
    async findAll(params) {
        try {
            return {
                rows: [],
                count: 0,
            };
        }
        catch (error) {
            throw new Error((0, generate_error_1.generateError)(error));
        }
    }
    async findOne(id) {
        try {
            const userData = await this.firebaseService.userCol.doc(id).get();
            const user = userData.data();
            return {
                ...user,
                id,
            };
        }
        catch (error) {
            return null;
        }
    }
    async update(id, updateUserDto) {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, config_1.saltOrRounds);
        }
        try {
            await this.firebaseService.userCol.doc(id).update({ ...updateUserDto });
            return id;
        }
        catch (error) {
            throw new Error((0, generate_error_1.generateError)(error));
        }
    }
    async remove(id) {
        try {
            await this.firebaseService.userCol.doc(id).delete();
            return id;
        }
        catch (error) {
            throw new Error((0, generate_error_1.generateError)(error));
        }
    }
    async findByEmail(email) {
        try {
            const document = await this.firebaseService.userCol
                .where(`email`, '==', email)
                .get();
            if (!document.size) {
                throw new Error('No data');
            }
            const datas = [];
            await document.forEach((doc) => {
                datas.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            return datas[0];
        }
        catch (error) {
            return null;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], UserService);
//# sourceMappingURL=user.service.js.map