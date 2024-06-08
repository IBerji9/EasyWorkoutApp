/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

export interface ApiSignupPayload {
  name?: string
  email: string
  password: string
  confirm_password: string
  language?: string
}

export interface ApiSignupResponse {
  status: string
  data: string
}

export interface ApiSigninPayload {
  email: string
  password: string
}

export interface ApiSigninResponse {
  status: string
  data: {
    id: string
    name: string
    email: string
    language: string
    role: string
    token: string
  }
}

export interface ApiUpdateProfilePayload {
  language?: string
  unit?: string
}

export interface ApiUpdateProfileResponse {
  status: string
  data: string
}

export interface ApiForgotPasswordPayload {
  email: string
}

export interface ApiForgotPasswordResponse {
  status: string
  data: string
}

export interface ApiChangePasswordPayload {
  current_password: string
  new_password: string
  confirm_password: string
}

export interface ApiChangePasswordResponse {
  status: string
  data: string
}
