import React, { View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from "react-native"
import { colors, spacing, typography } from "app/theme"
import { Text } from "./Text"
import { Icon } from "./Icon"

interface Props {
  title: string
  subtitle?: string
  color?: string
  style?: StyleProp<ViewStyle>
  onPress?: ((event: React.GestureResponderEvent) => void) | undefined
}

export const Menu = ({ title, subtitle, color, style: $styleOverride, onPress }: Props) => {
  const $wrapperStyles = [styles.$wrapper, { borderColor: color }, $styleOverride]
  return (
    <TouchableOpacity onPress={onPress} style={$wrapperStyles}>
      <View>
        <Text style={styles.$title}>{title}</Text>
        <Text style={styles.$subtitle}>{subtitle}</Text>
      </View>
      <Icon icon="plus" color={color} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  $subtitle: {
    color: colors.palette.grey4,
    fontFamily: typography.bold,
    fontSize: 12,
    lineHeight: 13,
  },
  $title: {
    fontFamily: typography.bold,
    fontSize: 20,
    lineHeight: 23,
    marginBottom: spacing.xxs,
  },
  $wrapper: {
    alignContent: "center",
    backgroundColor: colors.palette.neutral100,
    borderBottomWidth: 2,
    borderRadius: 13,
    borderRightWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
  },
})
