import { colors, spacing, typography } from "app/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  $forgotPassword: {
    color: colors.palette.blue1,
    fontFamily: typography.normal,
    fontSize: 12,
    lineHeight: 14,
  },
  $forgotPasswordView: {
    alignItems: "flex-end",
    color: colors.palette.blue1,
    marginBottom: spacing.md,
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
  $registerButton: {
    alignItems: "flex-end",
    color: colors.palette.blue1,
  },
  $registerDescription: {
    alignItems: "flex-end",
  },
  $registerView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.xl,
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
  },
})
