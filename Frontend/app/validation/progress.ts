import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export const addProgressSchema = yupResolver(
  yup.object().shape({
    value: yup.number().required("errors.requiredValue"),
  }),
)
