import React, { useRef } from "react"
import { useController, Control } from "react-hook-form"
import { Picker, PickerModes } from "react-native-ui-lib"
import { Text } from "../Text"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { join } from "lodash"

interface Props {
  control: Control<any>
  name: string
  options: { value: string | number; label: string }[]
  placeholder?: string
  mode?: PickerModes
}

export const HPicker = ({ name, control, options = [], placeholder, mode }: Props) => {
  const pickRef = useRef<any>(null)
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const $inputWrapperStyles = [$inputWrapperStyle]

  const focusInput = () => {
    if (!pickRef?.current) return

    pickRef?.current?.openExpandable()
  }

  return (
    <TouchableOpacity onPress={focusInput}>
      <View style={$inputWrapperStyles}>
        <Picker
          ref={pickRef}
          renderPicker={(values) => {
            if (!values) {
              return <Text>{placeholder}</Text>
            }
            if (mode === PickerModes.SINGLE) {
              return <Text>{options.find((it) => it.value === value).label}</Text>
            }
            if (mode === PickerModes.MULTI) {
              return <Text>{join(values, ", ")}</Text>
            }
          }}
          value={value}
          placeholder={placeholder}
          onChange={(language) => onChange(language)}
          mode={mode}
        >
          {options.map((option) => (
            <Picker.Item key={option.value} value={option.value} label={option.label} />
          ))}
        </Picker>
      </View>
    </TouchableOpacity>
  )
}

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 10,
  backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.grey2,
  overflow: "hidden",
  minHeight: 50,
  paddingHorizontal: spacing.md,
  marginBottom: spacing.md,
}
