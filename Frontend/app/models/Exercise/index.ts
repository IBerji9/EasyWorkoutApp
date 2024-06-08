import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "app/services/api"
import { ExerciseModel } from "./index.element"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const ExerciseStoreModel = types
  .model("ExerciseStore")
  .props({
    exercises: types.array(ExerciseModel),
  })
  .actions(withSetPropAction)
  .views((stores) => ({
    get exerciseOptions() {
      return stores.exercises.map((it) => ({ value: it.content, label: it.content }))
    },
  }))
  .actions((stores) => ({
    async fetchExercise() {
      try {
        const response = await api.fetchExercise()
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        stores.setProp("exercises", response.data)

        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
  }))

export interface ExerciseStore extends Instance<typeof ExerciseStoreModel> {}
export interface ExerciseStoreSnapshot extends SnapshotOut<typeof ExerciseStoreModel> {}
