/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { RoutineSnapshotIn } from "app/models/Routine/index.element"

export interface ApiFetchRoutinePayload {
  category_id: string
}

export interface ApiFetchRoutineResponse {
  status: string
  data: RoutineSnapshotIn[]
}

export interface ApiCreateRoutinePayload {
  title: string
  category_id: string
}

export interface ApiCreateRoutineResponse {
  status: string
  data: string
}

export interface ApiUpdateRoutinePayload extends Partial<ApiCreateRoutinePayload> {
  category_id: string
  id: string
}

export interface ApiUpdateRoutineResponse {
  status: string
  data: string
}
