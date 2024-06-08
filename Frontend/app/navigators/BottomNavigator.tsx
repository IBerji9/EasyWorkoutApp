import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { colors, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { DashboardScreen, ProfileScreen, ProgressScreen } from "app/screens"
import { RouteStack } from "./RouteNavigator"

export type DashboardScreenTabParamList = {
  DashboardScreen: undefined
  RouteScreen: undefined
  ProgressScreen: undefined
  ProfileScreen: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DashboardScreenTabScreenProps<T extends keyof DashboardScreenTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<DashboardScreenTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >

const Tab = createBottomTabNavigator<DashboardScreenTabParamList>()

/**
 * This is the main navigator for the DashboardScreen screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DashboardScreenNavigator`.
 */
export function BottomNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
      initialRouteName="DashboardScreen"
    >
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Icon icon="home" size={30} />,
        }}
      />
      <Tab.Screen
        name="RouteScreen"
        component={RouteStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Icon icon="route" size={30} />,
        }}
      />
      <Tab.Screen
        name="ProgressScreen"
        component={ProgressScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Icon icon="progress" size={30} />,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Icon icon="profile" size={30} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.normal,
  lineHeight: 16,
}
