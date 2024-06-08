import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * This represents an episode of React Native Radio.
 */
export const ProgressModel = types.model("Progress").props({
  id: types.identifier,
  value: types.number,
  date_recorded: "",
  user_id: "",
})

export interface Progress extends Instance<typeof ProgressModel> {}
export interface ProgressSnapshotOut extends SnapshotOut<typeof ProgressModel> {}
export interface ProgressSnapshotIn extends SnapshotIn<typeof ProgressModel> {}
