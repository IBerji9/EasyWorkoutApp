"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkoutDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_workout_dto_1 = require("./create-workout.dto");
class UpdateWorkoutDto extends (0, mapped_types_1.PartialType)(create_workout_dto_1.CreateWorkoutDto) {
}
exports.UpdateWorkoutDto = UpdateWorkoutDto;
//# sourceMappingURL=update-workout.dto.js.map