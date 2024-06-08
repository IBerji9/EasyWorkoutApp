import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { CategoryStoreModel } from "./Category"
import { ProgressStoreModel } from "./Progress"
import { RoutineStoreModel } from "./Routine"
import { WorkoutStoreModel } from "./Workout"
import { ExerciseStoreModel } from "./Exercise"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  progressStore: types.optional(ProgressStoreModel, {}),
  categoryStore: types.optional(CategoryStoreModel, {}),
  routineStore: types.optional(RoutineStoreModel, {}),
  workoutStore: types.optional(WorkoutStoreModel, {}),
  exerciseStore: types.optional(ExerciseStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
