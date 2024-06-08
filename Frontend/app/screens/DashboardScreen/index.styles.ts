import { spacing } from "app/theme"
import { StyleSheet } from "react-native"

export const useStyles = () => {
  const styles = StyleSheet.create({
    $menu: {
      marginBottom: spacing.lg,
    },
    $menuWrapper: {
      marginTop: spacing.xl,
    },
    $progressModal: {
      alignItems: "center",
      flex: 1,
      justifyContent: "flex-end",
      paddingHorizontal: spacing.md,
    },
    $screenContentContainer: {
      flex: 1,
      paddingHorizontal: spacing.md,
    },
  })

  return { styles }
}
