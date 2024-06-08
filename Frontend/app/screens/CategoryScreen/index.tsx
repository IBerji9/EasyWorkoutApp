import { Icon, ListEmptyComponent, RouteItem, Screen, Text } from "app/components"
import React, { useState, useEffect } from "react"
import { Alert, Pressable, TouchableOpacity, View } from "react-native"
import { RouteStackScreenProps } from "app/navigators/RouteNavigator"
import { styles } from "./index.styles"
import { FlatList } from "react-native-gesture-handler"
import { CategoryForm } from "app/containers"
import { Modal } from "react-native-ui-lib"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { CategoryType } from "app/services/api/api.category.types"
import { CategorySnapshotIn, CategorySnapshotOut } from "app/models/Category/index.element"
import { translate } from "app/i18n"
import { useFocusEffect } from "@react-navigation/native"

interface Props extends RouteStackScreenProps<"Category"> {}

export const CategoryScreen = observer(({ navigation }: Props) => {
  const [tab, setTab] = useState<CategoryType>(CategoryType.CREATED)
  const [seleted, setSeleted] = useState<CategorySnapshotIn>()
  const [isShow, setIsShow] = useState<boolean>(false)
  const {
    categoryStore: { fetchCategory, categories, removeCategory },
  } = useStores()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        tab === CategoryType.CREATED ? (
          <TouchableOpacity
            onPress={() => {
              setSeleted(undefined)
              setIsShow(true)
            }}
          >
            <Icon icon="plus" />
          </TouchableOpacity>
        ) : (
          <></>
        ),
    })
  }, [navigation, tab])

  useFocusEffect(() => {
    fetchCategory(tab)
  })

  const onUpdate = (item: CategorySnapshotIn) => {
    setSeleted(item)
    setIsShow(true)
  }

  const onDelete = (id: string) => {
    Alert.alert("", translate("alert.remove"), [
      {
        text: translate("common.cancel"),
      },
      {
        text: translate("common.ok"),
        onPress: () => removeCategory(id),
      },
    ])
  }

  return (
    <Screen preset="fixed" contentContainerStyle={styles.$screenContentContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isShow}
        onRequestClose={() => {
          setIsShow(!isShow)
        }}
      >
        <Pressable style={styles.$modal}>
          <CategoryForm onClose={() => setIsShow(false)} type={tab} seleted={seleted} />
        </Pressable>
      </Modal>
      <View>
        <Text tx="routeListScreen.title" style={styles.$title} />
      </View>
      <View style={styles.$tabTitleWrapper}>
        <Pressable
          style={styles.$tabTitle}
          onPress={() => {
            setTab(CategoryType.CREATED)
            fetchCategory(CategoryType.CREATED)
          }}
        >
          <View
            style={[
              styles.$tabTitleTextBorder,
              tab === CategoryType.CREATED && styles.$tabTitleTextActive,
            ]}
          >
            <Text
              tx="routeListScreen.tab1"
              style={[
                styles.$tabTitleText,
                tab === CategoryType.CREATED && styles.$tabTitleTextActive,
              ]}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.$tabTitle}
          onPress={() => {
            setTab(CategoryType.SYSTEM)
            fetchCategory(CategoryType.SYSTEM)
          }}
        >
          <View
            style={[
              styles.$tabTitleTextBorder,
              tab === CategoryType.SYSTEM && styles.$tabTitleTextActive,
            ]}
          >
            <Text
              tx="routeListScreen.tab2"
              style={[
                styles.$tabTitleText,
                tab === CategoryType.SYSTEM && styles.$tabTitleTextActive,
              ]}
            />
          </View>
        </Pressable>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: CategorySnapshotOut }) => (
          <RouteItem
            key={item.id}
            title={item?.title}
            onPress={() =>
              navigation.navigate("Routine", {
                categoryId: item.id,
                isCreated: tab === CategoryType.CREATED,
                title: item.title,
              })
            }
            isCreated={tab === CategoryType.CREATED}
            onUpdate={() => onUpdate(item)}
            onDelete={() => onDelete(item.id)}
            subtitle1={translate("common.days", { number: item.totalRoutine })}
            subtitle2={translate("common.exercises", { number: item.totalWorkout })}
          />
        )}
        ListEmptyComponent={() => <ListEmptyComponent />}
        contentContainerStyle={styles.$flatlistContainer}
      />
    </Screen>
  )
})
