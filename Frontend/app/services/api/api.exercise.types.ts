/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { ExerciseSnapshotIn } from "app/models/Exercise/index.element"

export interface ApiFetchExerciseResponse {
  status: string
  data: ExerciseSnapshotIn[]
}
