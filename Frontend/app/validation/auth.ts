import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"


export const signinSchema = yupResolver(
  yup.object().shape({
    email: yup.string().email("errors.invalidEmail").required("errors.requiredEmail"),
    password: yup.string().required("errors.requiredPassword"),
  }),
)

export const signupSchema = yupResolver(
  yup.object().shape({
    email: yup.string().email("errors.invalidEmail").required("errors.requiredEmail"),
    password: yup.string().required("errors.requiredPassword"),
    confirm_password: yup.string().required("errors.requiredPassword"),
  }),
)

export const forgotPasswordSchema = yupResolver(
  yup.object().shape({
    email: yup.string().email("errors.invalidEmail").required("errors.requiredEmail"),
  }),
)

export const changePasswordSchema = yupResolver(
  yup.object().shape({
    current_password: yup.string().required("errors.requiredPassword"),
    new_password: yup.string().required("errors.requiredPassword"),
    confirm_password: yup.string().required("errors.requiredPassword"),
  }),
)
