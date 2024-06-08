import { colors, spacing, typography } from "app/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  $backIcon: {
    alignItems: "center",
    backgroundColor: colors.palette.blue1,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  $leftIcon: {
    alignItems: "center",
    backgroundColor: colors.palette.blue1,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  $logo: {
    height: 50,
    marginBottom: spacing.xxl,
    width: "100%",
  },
  $screenContentContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  $tapButton: {
    marginTop: spacing.xs,
  },
  $textField: {
    marginBottom: spacing.lg,
  },
  $title: {
    fontFamily: typography.bold,
    fontSize: 32,
    lineHeight: 44,
    marginBottom: spacing.xl,
    textAlign: "center",
  }
})
