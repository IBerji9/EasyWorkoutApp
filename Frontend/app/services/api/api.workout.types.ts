/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { WorkoutSnapshotIn } from "app/models/Workout/index.element"

export interface ApiFetchWorkoutPayload {
  routine_id: string
}

export interface ApiFetchWorkoutResponse {
  status: string
  data: WorkoutSnapshotIn[]
}

export interface ApiCreateWorkoutPayload {
  title: string
  exercises?: string[]
  routine_id: string
}

export interface ApiCreateWorkoutResponse {
  status: string
  data: string
}

export interface ApiUpdateWorkoutPayload extends Partial<ApiCreateWorkoutPayload> {
  routine_id: string
  id: string
}

export interface ApiUpdateWorkoutResponse {
  status: string
  data: string
}
