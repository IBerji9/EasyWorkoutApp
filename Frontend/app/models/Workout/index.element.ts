import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * This represents an episode of React Native Radio.
 */
export const WorkoutModel = types.model("Workout").props({
  id: types.identifier,
  title: "",
  exercises: types.maybeNull(types.string),
  routine_id: "",
  user_id: "",
})

export interface Workout extends Instance<typeof WorkoutModel> {}
export interface WorkoutSnapshotOut extends SnapshotOut<typeof WorkoutModel> {}
export interface WorkoutSnapshotIn extends SnapshotIn<typeof WorkoutModel> {}
