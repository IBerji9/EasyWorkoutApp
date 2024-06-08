import React from "react"
import { View } from "react-native"
import { styles } from "./index.style"
import { Button, Icon, HTextField } from "app/components"
import { colors } from "app/theme"
import { RoutineSnapshotIn } from "app/models/Routine/index.element"
import { useStores } from "app/models"
import { useForm } from "react-hook-form"
import { createRoutineSchema } from "app/validation/routine"

interface Props {
  onClose?: () => void
  selected?: RoutineSnapshotIn
  categoryId: string
}

interface CreateRoutineForm {
  title: string
}

export const RoutineForm = ({ onClose, selected, categoryId }: Props) => {
  const { control, handleSubmit } = useForm<CreateRoutineForm>({
    resolver: createRoutineSchema,
    defaultValues: selected || { title: "" },
  })

  const {
    routineStore: { createRoutine, updateRoutine },
  } = useStores()

  const onSubmit = async (data: CreateRoutineForm) => {
    if (selected) {
      updateRoutine({ ...data, category_id: categoryId, id: selected.id }).then(() => onClose?.())
    } else {
      createRoutine({ ...data, category_id: categoryId }).then(() => onClose?.())
    }
  }

  return (
    <View style={styles.$wrapper}>
      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTx="routineForm.title"
        control={control}
        name="title"
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="lock" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />

      <View style={styles.$buttonWrapper}>
        <Button
          testID="login-button"
          tx="common.cancel"
          style={styles.$tapButton1}
          preset="filled"
          onPress={onClose}
        />
        <Button
          testID="login-button"
          tx="common.ok"
          style={styles.$tapButton2}
          preset="reversed"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}
