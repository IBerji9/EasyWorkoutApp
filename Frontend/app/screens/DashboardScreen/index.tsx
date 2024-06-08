import { Menu, Screen } from "app/components"
import { ProgressForm, UserInformation } from "app/containers"
import React, { useState } from "react"
import { View, Modal, Pressable } from "react-native"
import { useStyles } from "./index.styles"
import { translate } from "app/i18n"
import { colors } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { DashboardScreenTabScreenProps } from "app/navigators/BottomNavigator"

interface DashboardScreenProps extends DashboardScreenTabScreenProps<"DashboardScreen"> {}

export const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const [isShowProgress, setIsShowProgress] = useState<boolean>(false)
  const { styles } = useStyles()
  const $containerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.$screenContentContainer}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={isShowProgress}
        onRequestClose={() => {
          setIsShowProgress(!isShowProgress)
        }}
      >
        <Pressable
          style={[styles.$progressModal, $containerInsets]}
          onPress={() => setIsShowProgress(!isShowProgress)}
        >
          <ProgressForm onClose={() => setIsShowProgress(false)} />
        </Pressable>
      </Modal>
      <UserInformation />
      <View style={styles.$menuWrapper}>
        <Menu
          title={translate("dashboardScreen.menu1")}
          subtitle={translate("dashboardScreen.submenu1")}
          color={colors.palette.blue1}
          style={styles.$menu}
          onPress={() => navigation.navigate("RouteScreen")}
        />
        <Menu
          title={translate("dashboardScreen.menu2")}
          subtitle={translate("dashboardScreen.submenu2")}
          color={colors.palette.green1}
          style={styles.$menu}
          onPress={() => setIsShowProgress(true)}
        />
        <Menu
          title={translate("dashboardScreen.menu3")}
          subtitle={translate("dashboardScreen.submenu3")}
          color={colors.palette.pink1}
          style={styles.$menu}
          onPress={() => navigation.navigate("ProgressScreen")}
        />
      </View>
    </Screen>
  )
}
