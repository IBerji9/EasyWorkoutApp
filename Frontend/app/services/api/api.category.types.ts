/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { CategorySnapshotIn } from "app/models/Category/index.element"

export enum CategoryType {
  CREATED = "created",
  SYSTEM = "system",
}

export interface ApiFetchCategoryPayload {
  type?: CategoryType
  user_id: string
}

export interface ApiFetchCategoryResponse {
  status: string
  data: CategorySnapshotIn
}

export interface ApiCreateCategoryPayload {
  title: string
  type: CategoryType
}

export interface ApiCreateCategoryResponse {
  status: string
  data: string
}

export interface ApiUpdateCategoryPayload {
  id: string
  title?: string
  type?: CategoryType
}

export interface ApiUpdateCategoryResponse {
  status: string
  data: string
}
