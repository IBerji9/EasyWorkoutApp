import { Icon, Screen, Text } from "app/components"
import React, { useState } from "react"
import { View, Image, Pressable, Modal, Alert } from "react-native"
import { styles } from "./index.styles"
import { logo } from "app/config"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Picker } from "react-native-ui-lib"
import { useStores } from "app/models"
import { ChangePasswordForm } from "app/containers"
import { observer } from "mobx-react-lite"
import { translate } from "app/i18n"

interface ProfileScreenProps {}

const dialogOptions = [
  { label: "Español<> ", value: "es" },
  { label: "English<> ", value: "en" },
]

export const ProfileScreen = observer((_props: ProfileScreenProps) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const {
    authenticationStore: { logout, updateProfile, unit, language, removeAccount, name, initName },
  } = useStores()

  const alertRemoveAccount = () => {
    Alert.alert("", translate("alert.removeAccount"), [
      {
        text: translate("common.cancel"),
      },
      {
        text: translate("common.ok"),
        onPress: () => removeAccount(),
      },
    ])
  }

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.$screenContentContainer}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={isShow}
        onRequestClose={() => {
          setIsShow(!isShow)
        }}
      >
        <Pressable style={styles.$progressModal}>
          <ChangePasswordForm onClose={() => setIsShow(false)} />
        </Pressable>
      </Modal>
      <View style={styles.$avatarWrapper}>
        <View style={styles.$avatar}>
          <Text style={styles.$avatarText}>{initName}</Text>
        </View>
        <Text style={styles.$name}>{name}</Text>
      </View>
      <View>
        <View style={styles.$configLabelWrapper}>
          <Text tx="profileScreen.config" style={styles.$configLabel} />
        </View>
        <View style={styles.$configWrapper}>
          <View style={styles.$configRow1}>
            <TouchableOpacity style={styles.$rowPress} onPress={() => setIsShow(!isShow)}>
              <Text style={styles.$leftTitle} tx="profileScreen.changePassword" />
            </TouchableOpacity>
          </View>
          <View style={styles.$configRow2}>
            <Text style={styles.$leftTitle} tx="profileScreen.unitLabel" />
            <View style={styles.$unitWrapper}>
              <Pressable
                onPress={() => updateProfile({ unit: "kg" })}
                style={[styles.$unitButton, unit === "kg" && styles.$unitButtonActive]}
              >
                <Text style={styles.$unitButtonText} text="kg" />
              </Pressable>
              <Pressable
                onPress={() => updateProfile({ unit: "lbs" })}
                style={[styles.$unitButton, unit === "lbs" && styles.$unitButtonActive]}
              >
                <Text style={styles.$unitButtonText} text="lbs" />
              </Pressable>
            </View>
          </View>
          <View style={styles.$lastRow}>
            <Text style={styles.$leftTitle} tx="profileScreen.language" />
            <Picker
              renderPicker={(value) => {
                return (
                  <Text style={styles.$pickerText}>
                    {dialogOptions.find((it) => it.value === value).label}
                  </Text>
                )
              }}
              value={language}
              placeholder={"Placeholder"}
              onChange={(language) => updateProfile({ language })}
            >
              {dialogOptions.map((option) => (
                <Picker.Item key={option.value} value={option.value} label={option.label} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.$contactWrapper}>
        <Text style={styles.$contactText} tx="profileScreen.contact" />
      </View>

      <View style={styles.$configWrapper}>
        <View style={styles.$configRow1}>
          <TouchableOpacity style={styles.$rowPress} onPress={() => logout()}>
            <Text style={styles.$leftTitle1} tx="profileScreen.logout" />
          </TouchableOpacity>
        </View>
        <View style={styles.$lastRow}>
          <TouchableOpacity style={styles.$rowPress} onPress={alertRemoveAccount}>
            <Text style={styles.$leftTitle2} tx="profileScreen.delete" />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
})
