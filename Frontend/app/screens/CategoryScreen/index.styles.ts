import { colors, spacing, typography } from "app/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  $flatlistContainer: { flexGrow: 1 },
  $modal: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  $screenContentContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  $tabTitle: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  $tabTitleText: {
    fontFamily: typography.normal,
    fontSize: 16,
    lineHeight: 18,
  },
  $tabTitleTextActive: {
    borderBottomColor: colors.palette.blue1,
    color: colors.palette.blue1,
    fontFamily: typography.bold,
  },
  $tabTitleTextBorder: {
    borderBottomWidth: 1,
    paddingBottom: spacing.xs,
  },
  $tabTitleWrapper: {
    flexDirection: "row",
    paddingBottom: spacing.xl,
    paddingTop: spacing.xl,
  },
  $title: {
    fontFamily: typography.bold,
    fontSize: 32,
    lineHeight: 36,
  },
})
