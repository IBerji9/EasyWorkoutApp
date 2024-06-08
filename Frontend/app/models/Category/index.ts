import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "app/services/api"
import { CategoryModel } from "./index.element"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { getRootStore } from "../helpers/getRootStore"
import {
  ApiCreateCategoryPayload,
  ApiUpdateCategoryPayload,
  CategoryType,
} from "app/services/api/api.category.types"
import { translate } from "app/i18n"
import { reduce } from "lodash"

export const CategoryStoreModel = types
  .model("CategoryStore")
  .props({
    list: types.array(CategoryModel),
  })
  .views((self) => ({
    get rootStore() {
      return getRootStore(self)
    },
    get categories() {
      return self.list.map((item) => ({
        ...item,
        totalRoutine: item.routines?.length,
        totalWorkout: reduce(
          item.routines,
          (sum, routine) => {
            return sum + (routine?.workouts?.length || 0)
          },
          0,
        ),
      }))
    },
  }))
  .actions(withSetPropAction)
  .actions((stores) => ({
    async fetchCategory(type: CategoryType) {
      try {
        const response = await api.fetchCategory({
          type,
          user_id: stores.rootStore.authenticationStore.id,
        })
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
    async createCategory(payload: ApiCreateCategoryPayload) {
      try {
        const response = await api.createCategory(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        alert(translate("alert.createCategorySuccess"))
        await stores.fetchCategory(payload.type)
        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
    async updateCategory(payload: ApiUpdateCategoryPayload) {
      try {
        const response = await api.updateCategory(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        alert(translate("alert.updateCategorySuccess"))
        await stores.fetchCategory(payload.type || CategoryType.CREATED)
        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
    async removeCategory(payload: string) {
      try {
        const response = await api.deleteCategory(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        alert(translate("alert.deleteCategorySuccess"))
        await stores.fetchCategory(CategoryType.CREATED)
        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
  }))

export interface CategoryStore extends Instance<typeof CategoryStoreModel> {}
export interface CategoryStoreSnapshot extends SnapshotOut<typeof CategoryStoreModel> {}
