import { colors, spacing, typography } from "app/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  $avatar: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral900,
    borderRadius: 54,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  $avatarText: {
    color: colors.palette.white1,
    fontSize: 22,
  },
  $fullName: {
    fontFamily: typography.bold,
    fontSize: 20,
    lineHeight: 24,
  },
  $info: {
    marginLeft: spacing.xs,
  },
  $welcome: {
    fontFamily: typography.normal,
    fontSize: 15,
    lineHeight: 17,
  },
  $wrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
})
