/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { ProgressSnapshotIn } from "app/models/Progress/index.element"

export interface ApiSendProgressPayload {
  value: number
}

export interface ApiSendProgressResponse {
  status: string
  data: string
}

export interface ApiFetchProgressResponse {
  status: string
  data: ProgressSnapshotIn[]
}
