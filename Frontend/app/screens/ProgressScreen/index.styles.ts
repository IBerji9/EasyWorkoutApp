import { colors, spacing, typography } from "app/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  $configRow1: {
    borderBottomWidth: 1,
    paddingBottom: spacing.md,
  },
  $configRow2: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  $configWrapper: {
    backgroundColor: colors.palette.white1,
    borderRadius: 13,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  $leftTitle1: {
    fontFamily: typography.bold,
    fontSize: 18,
    lineHeight: 20,
  },
  $leftTitle2: {
    fontFamily: typography.normal,
    fontSize: 18,
    lineHeight: 20,
  },
  $screenContentContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  $summaryGrid: {
    marginBottom: spacing.md,
    width: "50%",
  },
  $summaryNumber: {
    fontFamily: typography.bold,
    fontSize: 16,
    lineHeight: 18,
    textAlign: "center",
  },
  $summaryTitle: {
    color: colors.palette.grey7,
    fontFamily: typography.bold,
    fontSize: 16,
    lineHeight: 18,
    textAlign: "center",
  },
  $summaryWrapper: {
    backgroundColor: colors.palette.white1,
    borderRadius: 13,
    marginVertical: spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
  },
  $title: {
    fontFamily: typography.bold,
    fontSize: 32,
    lineHeight: 36,
  },
})
