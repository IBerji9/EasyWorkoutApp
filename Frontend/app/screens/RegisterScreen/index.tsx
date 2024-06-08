import React from "react"
import { View, TouchableOpacity } from "react-native"
import { Button, HTextField, Icon, Screen, Text } from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors } from "../../theme"
import { styles } from "./index.style"
import { ApiSignupPayload } from "app/services/api"
import { useForm } from "react-hook-form"
import { signupSchema } from "app/validation/auth"

interface Props extends AppStackScreenProps<"Register"> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { control, handleSubmit } = useForm<ApiSignupPayload>({
    resolver: signupSchema,
  })

  const {
    authenticationStore: { signup },
  } = useStores()

  const onSignup = (data: ApiSignupPayload) => {
    signup(data).then(() => navigation.goBack())
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
      <Text tx="registerScreen.title" style={styles.$title} />
      <HTextField
        containerStyle={styles.$textField}
        autoCorrect={false}
        placeholderTx="registerScreen.fullName"
        control={control}
        name="name"
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="user" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />
      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        placeholderTx="registerScreen.email"
        control={control}
        name="email"
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="message" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />

      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoComplete="password"
        placeholderTx="registerScreen.password"
        autoCorrect={false}
        secureTextEntry={true}
        control={control}
        name="password"
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
        placeholderTx="registerScreen.confirmPassword"
        autoCorrect={false}
        secureTextEntry={true}
        control={control}
        name="confirm_password"
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="lock" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />

      <Button
        testID="Register-button"
        tx="registerScreen.button"
        style={styles.$tapButton}
        preset="reversed"
        onPress={handleSubmit(onSignup)}
      />
    </Screen>
  )
}
