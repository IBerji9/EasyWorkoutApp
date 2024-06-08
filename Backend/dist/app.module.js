"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mail_module_1 = require("./mail/mail.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const firebase_module_1 = require("./firebase/firebase.module");
const category_module_1 = require("./category/category.module");
const routine_module_1 = require("./routine/routine.module");
const workout_module_1 = require("./workout/workout.module");
const exercise_module_1 = require("./exercise/exercise.module");
const progress_module_1 = require("./progress/progress.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mail_module_1.MailModule,
            auth_module_1.AuthModule,
            user_module_1.UsersModule,
            firebase_module_1.FirebaseModule,
            category_module_1.CategoryModule,
            routine_module_1.RoutineModule,
            workout_module_1.WorkoutModule,
            exercise_module_1.ExerciseModule,
            progress_module_1.ProgressModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map