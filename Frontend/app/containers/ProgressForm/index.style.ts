import { colors, spacing, typography } from "app/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  $buttonStyle: {
    borderWidth: 0,
    minHeight: "auto",
    padding: 0,
  },
  $buttonTextStyle: {
    color: colors.palette.blue1,
    fontFamily: typography.normal,
    fontSize: 16,
    lineHeight: 18,
  },
  $containerStyle: {
    flex: 1,
  },
  $info: {
    alignItems: "center",
    flexDirection: "row",
  },
  $inputWrapperStyle: {
    backgroundColor: colors.palette.white1,
    borderWidth: 0,
    minHeight: 32,
  },
  $label: {
    fontFamily: typography.normal,
    fontSize: 20,
    lineHeight: 23,
  },
  $textfield: {
    fontFamily: typography.normal,
    fontSize: 16,
    lineHeight: 18,
    minHeight: 24,
  },
  $wrapper: {
    backgroundColor: colors.palette.white1,
    borderRadius: 6,
    padding: spacing.xxs,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    width: "100%",
  },
})
