import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { WorkoutModel } from "../Workout/index.element"

/**
 * This represents an episode of React Native Radio.
 */
export const RoutineModel = types.model("Routine").props({
  id: types.identifier,
  title: "",
  user_id: "",
  category_id: "",
  workouts: types.maybeNull(types.array(WorkoutModel)),
})

export interface Routine extends Instance<typeof RoutineModel> {}
export interface RoutineSnapshotOut extends SnapshotOut<typeof RoutineModel> {}
export interface RoutineSnapshotIn extends SnapshotIn<typeof RoutineModel> {}
