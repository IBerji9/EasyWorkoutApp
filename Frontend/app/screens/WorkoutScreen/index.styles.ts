import { spacing, typography } from "app/theme"
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
  $title: {
    fontFamily: typography.bold,
    fontSize: 32,
    lineHeight: 36,
  },
  $titleWrapper: {
    marginBottom: spacing.lg,
  },
})
