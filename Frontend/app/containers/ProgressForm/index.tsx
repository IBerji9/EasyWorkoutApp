import React from "react"
import { View } from "react-native"
import { styles } from "./index.style"
import { Button, Icon, Text, HTextField } from "app/components"
import { useStores } from "app/models"
import { useForm } from "react-hook-form"
import { addProgressSchema } from "app/validation/progress"
import { ApiSendProgressPayload } from "app/services/api/api.progress.types"

interface Props {
  onClose?: () => void
}

export const ProgressForm = ({ onClose }: Props) => {
  const { control, handleSubmit } = useForm<ApiSendProgressPayload>({
    resolver: addProgressSchema,
  })

  const {
    progressStore: { sendValue },
  } = useStores()

  const onSubmit = (data: ApiSendProgressPayload) => {
    sendValue(data).then(() => onClose?.())
  }

  return (
    <View style={styles.$wrapper}>
      <Text tx="progressForm.label" style={styles.$label} />
      <View style={styles.$info}>
        <HTextField
          placeholderTx="progressForm.placeholder"
          LeftAccessory={() => <Icon icon="greenUser" size={20} />}
          inputWrapperStyle={styles.$inputWrapperStyle}
          containerStyle={styles.$containerStyle}
          style={styles.$textfield}
          control={control}
          name="value"
          keyboardType="numeric"
        />
        <Button
          tx="progressForm.button"
          style={styles.$buttonStyle}
          textStyle={styles.$buttonTextStyle}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}
