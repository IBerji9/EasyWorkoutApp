import React from "react"
import { View } from "react-native"
import { styles } from "./index.style"
import { Button, Icon, HTextField } from "app/components"
import { colors } from "app/theme"
import { CategoryType } from "app/services/api/api.category.types"
import { createCategorySchema } from "app/validation/category"
import { useForm } from "react-hook-form"
import { useStores } from "app/models"
import { CategorySnapshotIn } from "app/models/Category/index.element"

interface Props {
  onClose?: () => void
  type: CategoryType
  seleted?: CategorySnapshotIn
}

interface CreateCategoryForm {
  title: string
}

export const CategoryForm = ({ onClose, type, seleted }: Props) => {
  const { control, handleSubmit } = useForm<CreateCategoryForm>({
    resolver: createCategorySchema,
    defaultValues: seleted || { title: "" },
  })

  const {
    categoryStore: { createCategory, updateCategory },
  } = useStores()

  const onSubmit = async (data: CreateCategoryForm) => {
    if (seleted) {
      updateCategory({ ...data, type, id: seleted.id }).then(() => onClose?.())
    } else {
      createCategory({ ...data, type }).then(() => onClose?.())
    }
  }

  return (
    <View style={styles.$wrapper}>
      <HTextField
        containerStyle={styles.$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        placeholderTx="categoryForm.title"
        control={control}
        name="title"
        LeftAccessory={() => (
          <View style={styles.$leftIcon}>
            <Icon icon="lock" color={colors.palette.neutral100} size={20} />
          </View>
        )}
      />

      <View style={styles.$buttonWrapper}>
        <Button
          testID="login-button"
          tx="common.cancel"
          style={styles.$tapButton1}
          preset="filled"
          onPress={onClose}
        />
        <Button
          testID="login-button"
          tx="common.ok"
          style={styles.$tapButton2}
          preset="reversed"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}
