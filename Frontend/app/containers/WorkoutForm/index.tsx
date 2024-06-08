import React, { useEffect } from "react"
import { View } from "react-native"
import { styles } from "./index.style"
import { Button, Icon, HTextField } from "app/components"
import { colors } from "app/theme"
import { WorkoutSnapshotIn } from "app/models/Workout/index.element"
import { useForm } from "react-hook-form"
import { createWorkoutSchema } from "app/validation/workout"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"

interface Props {
  onClose?: () => void
  selected?: WorkoutSnapshotIn
  routineId: string
}

interface CreateWorkoutForm {
  title: string
}

export const WorkoutForm = observer(({ onClose, selected, routineId }: Props) => {
  const { control, handleSubmit } = useForm<CreateWorkoutForm>({
    resolver: createWorkoutSchema,
    defaultValues: selected || { title: "" },
  })

  const {
    workoutStore: { createWorkout, updateWorkout },
    exerciseStore: { fetchExercise, exerciseOptions },
  } = useStores()

  const onSubmit = async (data: CreateWorkoutForm) => {
    if (selected) {
      updateWorkout({ ...data, routine_id: routineId, id: selected.id }).then(() => onClose?.())
    } else {
      createWorkout({ ...data, routine_id: routineId }).then(() => onClose?.())
    }
  }

  useEffect(() => {
    fetchExercise()
  }, [])

  return (
    <View style={styles.$wrapper}>
      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTx="workoutForm.title"
        control={control}
        name="title"
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="lock" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />

      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTx="workoutForm.exercise"
        keyboardType="numeric"
        control={control}
        name="exercises"
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
})
