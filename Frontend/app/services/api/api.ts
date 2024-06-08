/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig } from "./api.types"
import type {
  ApiSignupResponse,
  ApiSigninPayload,
  ApiSignupPayload,
  ApiSigninResponse,
  ApiUpdateProfilePayload,
  ApiUpdateProfileResponse,
  ApiChangePasswordPayload,
  ApiChangePasswordResponse,
  ApiForgotPasswordPayload,
  ApiForgotPasswordResponse,
} from "./api.auth.types"
import type { AuthenticationStoreSnapshotOut } from "../../models/AuthenticationStore"
import {
  ApiFetchProgressResponse,
  ApiSendProgressPayload,
  ApiSendProgressResponse,
} from "./api.progress.types"
import { ProgressSnapshotIn } from "app/models/Progress/index.element"
import { CategorySnapshotIn } from "app/models/Category/index.element"
import {
  ApiCreateCategoryPayload,
  ApiCreateCategoryResponse,
  ApiFetchCategoryPayload,
  ApiUpdateCategoryPayload,
  ApiUpdateCategoryResponse,
} from "./api.category.types"
import {
  ApiCreateRoutinePayload,
  ApiCreateRoutineResponse,
  ApiFetchRoutinePayload,
  ApiFetchRoutineResponse,
  ApiUpdateRoutinePayload,
  ApiUpdateRoutineResponse,
} from "./api.routine.types"
import { RoutineSnapshotIn } from "app/models/Routine/index.element"
import {
  ApiCreateWorkoutPayload,
  ApiCreateWorkoutResponse,
  ApiFetchWorkoutPayload,
  ApiFetchWorkoutResponse,
  ApiUpdateWorkoutPayload,
  ApiUpdateWorkoutResponse,
} from "./api.workout.types"
import { WorkoutSnapshotIn } from "app/models/Workout/index.element"
import { ExerciseSnapshotIn } from "app/models/Exercise/index.element"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Register a new user
   */
  async signup(
    payload: ApiSignupPayload,
  ): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiSignupResponse> = await this.apisauce.post(
      "auth/signup",
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Login backend to get token
   */
  async signin(
    payload: ApiSigninPayload,
  ): Promise<{ kind: "ok"; data: AuthenticationStoreSnapshotOut } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiSigninResponse> = await this.apisauce.post(
      "auth/signin",
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      if (!response?.data?.data) throw new Error("No data")
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * forgot password
   */
  async forgotPassword(
    payload: ApiForgotPasswordPayload,
  ): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiForgotPasswordResponse> = await this.apisauce.post(
      "auth/forgot-password",
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Login backend to get token
   */
  async changePassword(
    payload: ApiChangePasswordPayload,
  ): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiChangePasswordResponse> = await this.apisauce.put(
      "auth/change-password",
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Login backend to get token
   */
  async updateProfile(
    payload: ApiUpdateProfilePayload,
  ): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiUpdateProfileResponse> = await this.apisauce.put(
      "auth/profile",
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * remove account
   */
  async removeAccount(payload: string): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiSendProgressResponse> = await this.apisauce.delete(
      `progress/${payload}`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * send progress
   */
  async sendProgress(
    payload: ApiSendProgressPayload,
  ): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiSendProgressResponse> = await this.apisauce.post(
      "progress",
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * send progress
   */
  async fetchProgress(
    userId: string,
  ): Promise<{ kind: "ok"; data: ProgressSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFetchProgressResponse> = await this.apisauce.get("progress", {
      user_id: userId,
    })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data || [] }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Fetch category
   */
  async fetchCategory(
    params: ApiFetchCategoryPayload,
  ): Promise<{ kind: "ok"; data: CategorySnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFetchProgressResponse> = await this.apisauce.get(
      "category",
      params,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data || [] }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * create category
   */
  async createCategory(
    payload: ApiCreateCategoryPayload,
  ): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiCreateCategoryResponse> = await this.apisauce.post(
      "category",
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * update category
   */
  async updateCategory({
    id,
    ...payload
  }: ApiUpdateCategoryPayload): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiUpdateCategoryResponse> = await this.apisauce.patch(
      `category/${id}`,
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * update category
   */
  async deleteCategory(id: string): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiUpdateCategoryResponse> = await this.apisauce.delete(
      `category/${id}`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Fetch routine
   */
  async fetchRoutine(
    params: ApiFetchRoutinePayload,
  ): Promise<{ kind: "ok"; data: RoutineSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFetchRoutineResponse> = await this.apisauce.get(
      "routine",
      params,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data || [] }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * create Routine
   */
  async createRoutine(
    payload: ApiCreateRoutinePayload,
  ): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiCreateRoutineResponse> = await this.apisauce.post(
      "routine",
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * update routine
   */
  async updateRoutine({
    id,
    ...payload
  }: ApiUpdateRoutinePayload): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiUpdateRoutineResponse> = await this.apisauce.patch(
      `routine/${id}`,
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * update routine
   */
  async deleteRoutine(id: string): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiUpdateRoutineResponse> = await this.apisauce.delete(
      `routine/${id}`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Fetch routine
   */
  async fetchWorkout(
    params: ApiFetchWorkoutPayload,
  ): Promise<{ kind: "ok"; data: WorkoutSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFetchWorkoutResponse> = await this.apisauce.get(
      "workout",
      params,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data || [] }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * create Routine
   */
  async createWorkout(
    payload: ApiCreateWorkoutPayload,
  ): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiCreateWorkoutResponse> = await this.apisauce.post(
      "workout",
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * update routine
   */
  async updateWorkout({
    id,
    ...payload
  }: ApiUpdateWorkoutPayload): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiUpdateWorkoutResponse> = await this.apisauce.patch(
      `workout/${id}`,
      payload,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * update routine
   */
  async deleteWorkout(id: string): Promise<{ kind: "ok"; data?: string } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiUpdateWorkoutResponse> = await this.apisauce.delete(
      `workout/${id}`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Fetch exercise
   */
  async fetchExercise(): Promise<{ kind: "ok"; data: ExerciseSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFetchWorkoutResponse> = await this.apisauce.get("exercise")

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data?.data || [] }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
