import React, { View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from "react-native"
import { colors, spacing, typography } from "app/theme"
import { Text } from "./Text"
import { RouteAction } from "./RouteAction"

interface Props {
  title: string
  subtitle1?: string
  subtitle2?: string
  style?: StyleProp<ViewStyle>
  onPress?: ((event: React.GestureResponderEvent) => void) | undefined
  isCreated?: boolean
  onUpdate?: () => void
  onDelete?: () => void
}

export const RouteItem = ({
  title,
  subtitle1,
  subtitle2,
  style: $styleOverride,
  onPress,
  isCreated,
  onUpdate,
  onDelete,
}: Props) => {
  const $wrapperStyles = [styles.$wrapper, $styleOverride]
  return (
    <TouchableOpacity onPress={onPress} style={$wrapperStyles}>
      <View style={styles.$itemWrapper}>
        <View>
          <Text style={styles.$title}>{title}</Text>
          <View style={styles.$subtitleWrapper}>
            <Text style={styles.$subtitle1}>{subtitle1}</Text>
            <Text style={styles.$subtitle2}>{subtitle2}</Text>
          </View>
        </View>
        {isCreated && <RouteAction onUpdate={onUpdate} onDelete={onDelete} />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  $itemWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  $subtitle1: {
    color: colors.palette.grey2,
    fontFamily: typography.bold,
    fontSize: 15,
    lineHeight: 17,
    width: 120,
  },
  $subtitle2: {
    color: colors.palette.grey2,
    fontFamily: typography.bold,
    fontSize: 15,
    lineHeight: 17,
  },
  $subtitleWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  $title: {
    fontFamily: typography.bold,
    fontSize: 18,
    lineHeight: 20,
    marginBottom: spacing.xxs,
  },
  $wrapper: {
    alignContent: "center",
    backgroundColor: colors.palette.white1,
    borderRadius: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
    paddingBottom: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
  },
})
