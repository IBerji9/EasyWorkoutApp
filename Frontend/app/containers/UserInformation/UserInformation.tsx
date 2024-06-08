import React from "react"
import { Image, View } from "react-native"
import { styles } from "./UserInformation.style"
import { Text } from "app/components"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { translate } from "app/i18n"

interface Props {}

export const UserInformation = observer((_props: Props) => {
  const {
    authenticationStore: { name, initName },
  } = useStores()

  return (
    <View style={styles.$wrapper}>
      <View style={styles.$avatar}>
        <Text style={styles.$avatarText}>{initName}</Text>
      </View>
      <View style={styles.$info}>
        <Text style={styles.$fullName}>
          {translate("common.hello")}, {name}!
        </Text>
        <Text style={styles.$welcome} tx="userInformation.welcome" />
      </View>
    </View>
  )
})
