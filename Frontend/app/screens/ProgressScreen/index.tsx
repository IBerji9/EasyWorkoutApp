import { Screen, Text } from "app/components"
import React, { useEffect } from "react"
import { View } from "react-native"
import { styles } from "./index.styles"
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter } from "victory-native"
import { observer } from "mobx-react-lite"
import { useStores } from "app/models"
import { format, parse } from "date-fns"

interface ProgressScreenProps {}

export const ProgressScreen = observer((_props: ProgressScreenProps) => {
  const {
    progressStore: { fetchProgress, chartData },
    authenticationStore: { unit },
  } = useStores()

  useEffect(() => {
    fetchProgress()
  }, [])

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.$screenContentContainer}
    >
      <View>
        <Text tx="progressScreen.title" style={styles.$title} />
      </View>
      <View style={styles.$summaryWrapper}>
        <View style={styles.$summaryGrid}>
          <Text style={styles.$summaryTitle} tx="progressScreen.summary" />
          <Text style={styles.$summaryNumber} text={`${chartData?.[0]?.x || 0} ${unit}`} />
        </View>
        <VictoryChart padding={{ top: 0, bottom: 5, left: 5, right: 100 }} height={200}>
          <VictoryLine
            style={{
              data: { stroke: "#000" },
              parent: { border: "1px solid #ccc" },
            }}
            data={chartData}
          />
          <VictoryScatter style={{ data: { fill: "#000" } }} size={2} data={chartData} />
          <VictoryAxis
            orientation="right"
            style={{
              axis: { strokeWidth: 0 },
              grid: { stroke: "#000", strokeWidth: 1 },
            }}
          />
          <VictoryAxis
            orientation="bottom"
            style={{
              axis: { strokeWidth: 0 },
              grid: { stroke: "#000", strokeWidth: 1 },
            }}
          />
        </VictoryChart>
      </View>
      <View style={styles.$configWrapper}>
        <View style={styles.$configRow1}>
          <Text style={styles.$leftTitle1} tx="progressScreen.history" />
        </View>
        {chartData.map((item, key) => (
          <View style={styles.$configRow2} key={key}>
            <Text style={styles.$leftTitle2} text={`${item.x} ${unit}`} />
            <Text
              style={styles.$leftTitle2}
              text={`${format(parse(item.y, "yyyy-MM-dd HH:mm:ss", new Date()), "d/M")}`}
            />
          </View>
        ))}
      </View>
    </Screen>
  )
})
