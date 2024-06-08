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
  $avatarWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  $configLabel: {
    fontFamily: typography.semiBold,
    fontSize: 14,
    lineHeight: 16,
  },
  $configLabelWrapper: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  $configRow1: {
    borderBottomWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  $configRow2: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  $configWrapper: {
    backgroundColor: colors.palette.white1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  $contactText: {
    fontFamily: typography.semiBold,
    fontSize: 14,
    lineHeight: 16,
  },
  $contactWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  $lastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  $leftTitle: {
    fontFamily: typography.semiBold,
    fontSize: 16,
    lineHeight: 19,
  },
  $leftTitle1: {
    color: colors.palette.blue1,
    fontFamily: typography.semiBold,
    fontSize: 16,
    lineHeight: 19,
  },
  $leftTitle2: {
    color: colors.palette.red1,
    fontFamily: typography.semiBold,
    fontSize: 16,
    lineHeight: 19,
  },
  $name: {
    fontFamily: typography.semiBold,
    fontSize: 20,
    lineHeight: 24,
    marginTop: spacing.md,
  },
  $pickerText: {
    color: colors.palette.blue1,
    fontFamily: typography.normal,
    fontSize: 16,
    lineHeight: 19,
  },
  $progressModal: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  $rowPress: {
    width: "100%",
  },
  $screenContentContainer: {
    flex: 1,
  },
  $unitButton: {
    alignItems: "center",
    borderRadius: 13,
    flex: 1,
    paddingVertical: spacing.xxs,
  },
  $unitButtonActive: {
    backgroundColor: colors.palette.white1,
  },
  $unitButtonText: {
    fontFamily: typography.semiBold,
    fontSize: 16,
    lineHeight: 19,
  },
  $unitWrapper: {
    backgroundColor: colors.palette.grey6,
    borderRadius: 13,
    flexDirection: "row",
    padding: spacing.xs,
    width: 95,
  },
})
