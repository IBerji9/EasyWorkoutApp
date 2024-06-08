import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * This represents an episode of React Native Radio.
 */
export const ExerciseModel = types.model("Exercise").props({
  id: types.identifier,
  content: "",
})

export interface Exercise extends Instance<typeof ExerciseModel> {}
export interface ExerciseSnapshotOut extends SnapshotOut<typeof ExerciseModel> {}
export interface ExerciseSnapshotIn extends SnapshotIn<typeof ExerciseModel> {}
