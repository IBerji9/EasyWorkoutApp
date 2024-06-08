import React, { Ref, forwardRef } from "react"
import { TextInput } from "react-native"
import { useController, Control } from "react-hook-form"
import { TextField, TextFieldProps } from "../TextField"
import { translate } from "app/i18n"

interface Props extends TextFieldProps {
  control: Control<any>
  name: string
}

export const HTextField = forwardRef(({ name, control, ...rest }: Props, ref: Ref<TextInput>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <TextField
      {...rest}
      onChangeText={onChange}
      helper={error?.message && translate(error?.message || "common.error")}
      status={error?.message ? "error" : undefined}
      value={value}
      ref={ref}
    />
  )
})
