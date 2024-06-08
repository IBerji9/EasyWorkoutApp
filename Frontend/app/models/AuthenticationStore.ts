import {
  ApiChangePasswordPayload,
  ApiForgotPasswordPayload,
  ApiSigninPayload,
  ApiSignupPayload,
  ApiUpdateProfilePayload,
  api,
} from "app/services/api"
import { Instance, SnapshotOut, types, SnapshotIn } from "mobx-state-tree"
import i18n from "i18n-js"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { translate } from "app/i18n"
import RNRestart from "react-native-restart"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    token: types.maybe(types.string),
    id: "",
    email: "",
    name: types.maybe(types.string),
    language: types.maybe(types.string),
    role: "",
    unit: "",
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get isAuthenticated() {
      return !!store.token
    },
    get initName() {
      const init = store.name || store.email
      return init.charAt(0)
    },
  }))
  .actions((store) => ({
    setUser(data: AuthenticationStoreSnapshotOut) {
      store.token = data.token
      store.id = data.id
      store.email = data.email
      store.name = data.name
      store.language = data.language
      store.role = data.role
      store.unit = data.unit
    },
    logout() {
      i18n.locale = "es"
      store.token = undefined
      store.token = ""
      store.id = ""
      store.email = ""
      store.name = ""
      store.language = "es"
      store.role = ""
      store.unit = "kg"
    },
  }))
  .actions((store) => ({
    async signin(payload: ApiSigninPayload) {
      const response = await api.signin(payload)
      if (response.kind === "ok") {
        api.apisauce.setHeader("Authorization", `Bearer ${response.data.token}`)
        i18n.locale = response.data.language || "en"
        store.setUser(response.data)
      } else {
        alert(`Error: ${JSON.stringify(response)}`)
      }
    },
    async signup(payload: ApiSignupPayload) {
      try {
        const response = await api.signup(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }
        alert(translate("alert.registerSuccess"))

        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
    async forgotPassword(payload: ApiForgotPasswordPayload) {
      try {
        const response = await api.forgotPassword(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }
        alert(translate("alert.sendNewPassword"))

        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
    async changePassword(payload: ApiChangePasswordPayload) {
      try {
        const response = await api.changePassword(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }
        alert(translate("alert.changePassword"))

        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
    async updateProfile(payload: ApiUpdateProfilePayload) {
      try {
        const response = await api.updateProfile(payload)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        if (payload.language) {
          i18n.locale = payload.language
          store.setProp("language", payload.language)
          RNRestart.restart()
        }

        if (payload.unit) {
          store.setProp("unit", payload.unit)
        }

        return Promise.resolve()
      } catch (error) {
        console.log(error)
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
    async removeAccount() {
      try {
        const response = await api.removeAccount(store.id)
        if (response.kind !== "ok") {
          throw new Error(response.kind)
        }

        alert(translate("alert.deleteAccountSuccess"))
        store.logout()
        return Promise.resolve()
      } catch (error) {
        alert(`Error: ${JSON.stringify(error.message)}`)
        return Promise.reject(error.message)
      }
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotOut
  extends SnapshotOut<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotIn
  extends SnapshotIn<typeof AuthenticationStoreModel> {}
