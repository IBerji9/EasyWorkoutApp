import { colors, spacing, typography } from "app/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  $buttonWrapper: {
    flexDirection: "row",
  },
  $leftIcon: {
    alignItems: "center",
    backgroundColor: colors.palette.blue1,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  $tapButton1: {
    flex: 1,
    marginRight: spacing.md,
  },
  $tapButton2: {
    flex: 1,
    marginLeft: spacing.md,
  },
  $textField: {
    marginBottom: spacing.md,
  },
  $wrapper: {
    backgroundColor: colors.palette.white1,
    borderRadius: 6,
    padding: spacing.md,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    width: "100%",
  },
})
