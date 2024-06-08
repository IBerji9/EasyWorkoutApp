import { Icon, ListEmptyComponent, RouteItem, Screen, Text } from "app/components"
import React, { useEffect, useState } from "react"
import { Alert, TouchableOpacity, View } from "react-native"
import { RouteStackScreenProps } from "app/navigators/RouteNavigator"
import { styles } from "./index.styles"
import { FlatList } from "react-native-gesture-handler"
import { Modal } from "react-native-ui-lib"
import { WorkoutForm } from "app/containers"
import { WorkoutSnapshotIn } from "app/models/Workout/index.element"
import { translate } from "app/i18n"
import { useStores } from "app/models"
import { getSnapshot } from "mobx-state-tree"
import { observer } from "mobx-react-lite"

interface Props extends RouteStackScreenProps<"Workout"> {}

export const WorkoutScreen = observer(({ route, navigation }: Props) => {
  const { routineId, isCreated, title } = route.params

  const [selected, setSeleted] = useState<WorkoutSnapshotIn>()
  const [isShow, setIsShow] = useState<boolean>(false)
  const {
    workoutStore: { fetchWorkout, list, removeWorkout },
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

  useEffect(() => {
    fetchWorkout({ routine_id: routineId })
  }, [routineId])

  const onUpdate = (item: WorkoutSnapshotIn) => {
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
        onPress: () => removeWorkout(id, routineId),
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
          <WorkoutForm onClose={() => setIsShow(false)} selected={selected} routineId={routineId} />
        </View>
      </Modal>
      <View style={styles.$titleWrapper}>
        <Text text={title} style={styles.$title} />
      </View>
      <FlatList
        data={getSnapshot(list)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: WorkoutSnapshotIn }) => (
          <RouteItem
            key={item.id}
            title={item?.title || ""}
            isCreated={isCreated}
            onUpdate={() => onUpdate(item)}
            onDelete={() => onDelete(item.id)}
            subtitle1={translate("common.series", { number: item.exercises || 0 })}
          />
        )}
        ListEmptyComponent={() => <ListEmptyComponent />}
        contentContainerStyle={styles.$flatlistContainer}
      />
    </Screen>
  )
})
