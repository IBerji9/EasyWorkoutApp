import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export const createWorkoutSchema = yupResolver(
  yup.object().shape({
    title: yup.string().required("errors.requiredTitle"),
  }),
)
