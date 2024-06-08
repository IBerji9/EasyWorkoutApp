import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "app/services/api"
import { RoutineModel } from "./index.element"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { getRootStore } from "../helpers/getRootStore"
import {
  ApiCreateRoutinePayload,
  ApiFetchRoutinePayload,
  ApiUpdateRoutinePayload,
} from "app/services/api/api.routine.types"
import { translate } from "app/i18n"
import { reduce } from "lodash"

export const RoutineStoreModel = types
  .model("RoutineStore")
  .props({
    list: types.array(RoutineModel),
  })
  .views((self) => ({
    get rootStore() {
      return getRootStore(self)
    },
    get routines() {
      return self.list.map((item) => ({
        ...item,
        totalWorkout: item.workouts?.length,
        totalExercise: reduce(
          item.workouts,
          (sum, routine) => {
            return sum + (Number(routine?.exercises) || 0)
          },
          0,
        ),
      }))
    },
  }))
  .actions(withSetPropAction)
  .actions((stores) => ({
    async fetchRoutine(params: ApiFetchRoutinePayload) {
      try {
        const response = await api.fetchRoutine(params)
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
    async createRoutine(payload: ApiCreateRoutinePayload) {
      try {
        const response = await api.createRoutine(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        alert(translate("alert.createRoutineSuccess"))
        await stores.fetchRoutine({ category_id: payload.category_id })
        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
    async updateRoutine(payload: ApiUpdateRoutinePayload) {
      try {
        const response = await api.updateRoutine(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        alert(translate("alert.updateRoutineSuccess"))
        await stores.fetchRoutine({ category_id: payload.category_id })
        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
    async removeRoutine(payload: string, categoryId: string) {
      try {
        const response = await api.deleteRoutine(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        alert(translate("alert.deleteRoutineSuccess"))
        await stores.fetchRoutine({ category_id: categoryId })
        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
  }))

export interface RoutineStore extends Instance<typeof RoutineStoreModel> {}
export interface RoutineStoreSnapshot extends SnapshotOut<typeof RoutineStoreModel> {}
