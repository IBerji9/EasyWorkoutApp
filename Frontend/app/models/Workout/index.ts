import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "app/services/api"
import { WorkoutModel } from "./index.element"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { getRootStore } from "../helpers/getRootStore"
import {
  ApiCreateWorkoutPayload,
  ApiFetchWorkoutPayload,
  ApiUpdateWorkoutPayload,
} from "app/services/api/api.workout.types"
import { translate } from "app/i18n"

export const WorkoutStoreModel = types
  .model("WorkoutStore")
  .props({
    list: types.array(WorkoutModel),
  })
  .views((self) => ({
    get rootStore() {
      return getRootStore(self)
    },
  }))
  .actions(withSetPropAction)
  .actions((stores) => ({
    async fetchWorkout(params: ApiFetchWorkoutPayload) {
      try {
        const response = await api.fetchWorkout(params)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        stores.setProp("list", response.data)

        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
  }))
  .actions((stores) => ({
    async createWorkout(payload: ApiCreateWorkoutPayload) {
      try {
        const response = await api.createWorkout(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        alert(translate("alert.createWorkoutSuccess"))
        await stores.fetchWorkout({ routine_id: payload.routine_id })
        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
    async updateWorkout(payload: ApiUpdateWorkoutPayload) {
      try {
        const response = await api.updateWorkout(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        alert(translate("alert.updateWorkoutSuccess"))
        await stores.fetchWorkout({ routine_id: payload.routine_id })
        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
    async removeWorkout(payload: string, routineId: string ) {
      try {
        const response = await api.deleteWorkout(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        alert(translate("alert.deleteWorkoutSuccess"))
        await stores.fetchWorkout({ routine_id: routineId })
        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
  }))

export interface WorkoutStore extends Instance<typeof WorkoutStoreModel> {}
export interface WorkoutStoreSnapshot extends SnapshotOut<typeof WorkoutStoreModel> {}
