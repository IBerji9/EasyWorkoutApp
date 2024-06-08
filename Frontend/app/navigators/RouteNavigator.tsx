import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { colors } from "app/theme"
import { CategoryScreen, RoutineScreen, WorkoutScreen } from "app/screens"
import { translate } from "app/i18n"

export type RouteStackParamList = {
  Category: undefined
  Routine: {
    isCreated: boolean
    categoryId: string
    title: string
  }
  Workout: {
    isCreated: boolean
    routineId: string
    title: string
  }
}

export type RouteStackScreenProps<T extends keyof RouteStackParamList> = NativeStackScreenProps<
  RouteStackParamList,
  T
>

const Stack = createNativeStackNavigator<RouteStackParamList>()

export const RouteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        navigationBarColor: colors.background,
        headerStyle: {
          backgroundColor: colors.palette.grey3,
        },
        headerShadowVisible: false,
        headerBackTitle: translate("common.back"),
      }}
      initialRouteName="Category"
    >
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Routine" component={RoutineScreen} />
      <Stack.Screen name="Workout" component={WorkoutScreen} />
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}
