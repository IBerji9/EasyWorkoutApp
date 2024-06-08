// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  Inter_400Regular as interRegular,
  Inter_600SemiBold as interSemiBold,
  Inter_700Bold as interBold,
} from "@expo-google-fonts/inter"

export const customFontsToLoad = {
  interRegular,
  interSemiBold,
  interBold,
}

export const typography = {
  normal: "interRegular",
  semiBold: "interSemiBold",
  bold: "interBold",
}
