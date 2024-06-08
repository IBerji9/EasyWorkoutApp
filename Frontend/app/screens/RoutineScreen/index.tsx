import { Icon, ListEmptyComponent, RouteItem, Screen, Text } from "app/components"
import React, { useState, useEffect } from "react"
import { Alert, TouchableOpacity, View } from "react-native"
import { RouteStackScreenProps } from "app/navigators/RouteNavigator"
import { styles } from "./index.styles"
import { FlatList } from "react-native-gesture-handler"
import { translate } from "app/i18n"
import { Modal } from "react-native-ui-lib"
import { RoutineForm } from "app/containers"
import { useStores } from "app/models"
import { RoutineSnapshotIn } from "app/models/Routine/index.element"
import { observer } from "mobx-react-lite"
import { useFocusEffect } from "@react-navigation/native"

interface Props extends RouteStackScreenProps<"Routine"> {}

export const RoutineScreen = observer(({ route, navigation }: Props) => {
  const { categoryId, isCreated, title } = route.params

  const [selected, setSeleted] = useState<RoutineSnapshotIn>()
  const [isShow, setIsShow] = useState<boolean>(false)
  const {
    routineStore: { fetchRoutine, routines, removeRoutine },
  } = useStores()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isCreated ? (
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
  }, [navigation, isCreated])

  useFocusEffect(() => {
    fetchRoutine({ category_id: categoryId })
  })

  const onUpdate = (item: RoutineSnapshotIn) => {
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
        onPress: () => removeRoutine(id, categoryId),
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
        <View style={styles.$modal}>
          <RoutineForm
            onClose={() => setIsShow(false)}
            selected={selected}
            categoryId={categoryId}
          />
        </View>
      </Modal>
      <View>
        <Text text={title} style={styles.$title} />
      </View>
      <View style={styles.$tabTitleWrapper}>
        <View style={styles.$tabTitle}>
          <View style={[styles.$tabTitleTextBorder, styles.$tabTitleTextActive]}>
            <Text
              tx="routeListScreen.tab3"
              style={[styles.$tabTitleText, styles.$tabTitleTextActive]}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: RoutineSnapshotIn }) => (
          <RouteItem
            key={item.id}
            title={item?.title || ""}
            onPress={() =>
              navigation.navigate("Workout", {
                routineId: item.id,
                isCreated,
                title: item.title || "",
              })
            }
            isCreated={isCreated}
            onUpdate={() => onUpdate(item)}
            onDelete={() => onDelete(item.id)}
            subtitle1={translate("common.exercises", { number: item.totalWorkout })}
            subtitle2={translate("common.series", { number: item.totalExercise })}
          />
        )}
        ListEmptyComponent={() => <ListEmptyComponent />}
        contentContainerStyle={styles.$flatlistContainer}
      />
    </Screen>
  )
})
