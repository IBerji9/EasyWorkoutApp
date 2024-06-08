import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { RoutineModel } from "../Routine/index.element"

/**
 * This represents an episode of React Native Radio.
 */
export const CategoryModel = types.model("Category").props({
  id: types.identifier,
  title: "",
  user_id: "",
  type: "",
  routines: types.maybeNull(types.array(RoutineModel)),
})

export interface Category extends Instance<typeof CategoryModel> {}
export interface CategorySnapshotOut extends SnapshotOut<typeof CategoryModel> {}
export interface CategorySnapshotIn extends SnapshotIn<typeof CategoryModel> {}
