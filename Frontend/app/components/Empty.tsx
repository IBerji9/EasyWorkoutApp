import React, { View, StyleSheet, StyleProp, ViewStyle } from "react-native"
import { spacing, typography } from "app/theme"
import { Text } from "./Text"
import { Icon } from "./Icon"

interface Props {
  style?: StyleProp<ViewStyle>
}

export const ListEmptyComponent = ({ style: $styleOverride }: Props) => {
  const $wrapperStyles = [styles.$wrapper, $styleOverride]
  return (
    <View style={$wrapperStyles}>
      <Icon icon="find" containerStyle={styles.$containerStyle} />
      <Text tx="routeListScreen.noData" style={styles.$title} />
    </View>
  )
}

const styles = StyleSheet.create({
  $containerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  $title: {
    fontFamily: typography.normal,
    fontSize: 16,
    lineHeight: 18,
    marginTop: spacing.lg,
    textAlign: "center",
  },
  $wrapper: {
    alignContent: "center",
    borderRadius: 13,
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
  },
})
