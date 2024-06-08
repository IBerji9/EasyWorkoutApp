import React from "react"
import { View } from "react-native"
import { styles } from "./index.style"
import { Button, HTextField, Icon, Text, TextField } from "app/components"
import { colors } from "app/theme"
import { ApiChangePasswordPayload } from "app/services/api"
import { useForm } from "react-hook-form"
import { changePasswordSchema } from "app/validation/auth"
import { useStores } from "app/models"

interface Props {
  onClose?: () => void
}

export const ChangePasswordForm = ({ onClose }: Props) => {
  const { control, handleSubmit } = useForm<ApiChangePasswordPayload>({
    resolver: changePasswordSchema,
  })

  const {
    authenticationStore: { changePassword },
  } = useStores()

  const onSubmit = (data: ApiChangePasswordPayload) => {
    changePassword(data).then(() => onClose?.())
  }

  return (
    <View style={styles.$wrapper}>
      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry
        placeholderTx="registerScreen.currentPassword"
        control={control}
        name="current_password"
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="lock" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />

      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry
        placeholderTx="registerScreen.password"
        control={control}
        name="new_password"
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="lock" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />

      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry
        placeholderTx="registerScreen.confirmPassword"
        control={control}
        name="confirm_password"
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
