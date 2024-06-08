import React, { useEffect, useRef, useState } from "react"
import { TextInput, View, TouchableOpacity } from "react-native"
import { Button, Icon, Screen, Text, HTextField } from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors } from "../../theme"
import { styles } from "./index.style"
import { forgotPasswordSchema } from "app/validation/auth"
import { useForm } from "react-hook-form"
import { ApiForgotPasswordPayload } from "app/services/api"

interface Props extends AppStackScreenProps<"ForgotPassword"> {}

export const ForgotPasswordScreen = ({ navigation }: Props) => {
  const { control, handleSubmit } = useForm<ApiForgotPasswordPayload>({
    resolver: forgotPasswordSchema,
  })

  const {
    authenticationStore: { forgotPassword },
  } = useStores()

  const onForgotPassword = (data: ApiForgotPasswordPayload) => {
    forgotPassword(data).then(() => navigation.goBack())
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <TouchableOpacity style={styles.$backIcon} onPress={() => navigation.goBack()}>
        <Icon icon="leftArrow" color={colors.palette.neutral100} size={20} />
      </TouchableOpacity>
      <Text tx="forgotpasswordScreen.title" style={styles.$title} />
      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        placeholderTx="forgotpasswordScreen.email"
        control={control}
        name="email"
        onSubmitEditing={handleSubmit(forgotPassword)}
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="message" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />
      <Button
        testID="login-button"
        tx="forgotpasswordScreen.button"
        style={styles.$tapButton}
        preset="reversed"
        onPress={handleSubmit(onForgotPassword)}
      />
    </Screen>
  )
}
