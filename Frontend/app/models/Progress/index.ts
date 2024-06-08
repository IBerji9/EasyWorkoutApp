import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "app/services/api"
import { ProgressModel } from "./index.element"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { ApiSendProgressPayload } from "app/services/api/api.progress.types"
import { getRootStore } from "../helpers/getRootStore"
import { format, parse } from "date-fns"
import { translate } from "app/i18n"

export const ProgressStoreModel = types
  .model("ProgressStore")
  .props({
    list: types.array(ProgressModel),
  })
  .views((self) => ({
    get rootStore() {
      return getRootStore(self)
    },
    get chartData() {
      let unit: string = getRootStore(self).authenticationStore.unit
      if (!unit) {
        unit = "kg"
      }
      return (self.list || []).map((item) => ({
        y: item.date_recorded,
        x: unit === "kg" ? item.value : Number((item.value / 0.45359237).toFixed(2)),
      }))
    },
  }))
  .actions(withSetPropAction)
  .actions((stores) => ({
    async fetchProgress() {
      try {
        const response = await api.fetchProgress(stores.rootStore.authenticationStore.id)
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
    async sendValue(payload: ApiSendProgressPayload) {
      try {
        const response = await api.sendProgress(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }
        await stores.fetchProgress()
        alert(translate("alert.createProgressSuccess"))

        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
  }))

export interface ProgressStore extends Instance<typeof ProgressStoreModel> {}
export interface ProgressStoreSnapshot extends SnapshotOut<typeof ProgressStoreModel> {}
