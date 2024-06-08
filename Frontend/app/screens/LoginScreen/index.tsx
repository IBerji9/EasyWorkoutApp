import React, { useRef } from "react"
import { TextInput, Image, View, TouchableOpacity } from "react-native"
import { logo } from "app/config"
import { Button, Icon, Screen, Text, HTextField } from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors } from "../../theme"
import { styles } from "./index.style"
import { useForm } from "react-hook-form"
import { ApiSigninPayload } from "app/services/api"
import { signinSchema } from "app/validation/auth"

interface Props extends AppStackScreenProps<"Login"> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { control, handleSubmit } = useForm<ApiSigninPayload>({
    resolver: signinSchema,
  })

  const authPasswordInput = useRef<TextInput>(null)

  const {
    authenticationStore: { signin },
  } = useStores()

  const login = (data: ApiSigninPayload) => {
    signin(data)
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Image source={logo} style={styles.$logo} />

      <Text tx="loginScreen.signIn" style={styles.$title} />
      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        placeholderTx="loginScreen.email"
        control={control}
        name="email"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="message" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />

      <HTextField
        ref={authPasswordInput}
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        control={control}
        name="password"
        placeholderTx="loginScreen.password"
        onSubmitEditing={handleSubmit(login)}
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="lock" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />
      <View style={styles.$forgotPasswordView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword")
          }}
        >
          <Text tx="loginScreen.forgotPassword" style={styles.$forgotPassword} />
        </TouchableOpacity>
      </View>
      <Button
        testID="login-button"
        tx="loginScreen.signIn"
        style={styles.$tapButton}
        preset="reversed"
        onPress={handleSubmit(login)}
      />
      <View style={styles.$registerView}>
        <Text tx="loginScreen.registerDescription" style={styles.$registerDescription} />
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text tx="loginScreen.register" style={styles.$registerButton} />
        </TouchableOpacity>
      </View>
    </Screen>
  )
}
