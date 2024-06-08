import React from "react"
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu"
import { Text } from "./Text"

interface Props {
  onUpdate?: () => void
  onDelete?: () => void
}

export const RouteAction = ({ onUpdate, onDelete }: Props) => {
  return (
    <Menu>
      <MenuTrigger>
        <Text>...</Text>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={onUpdate}>
          <Text tx="common.edit" />
        </MenuOption>
        <MenuOption onSelect={onDelete}>
          <Text tx="common.delete" />
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}
