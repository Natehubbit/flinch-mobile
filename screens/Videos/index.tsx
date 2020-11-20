import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const DATA = [
  1, 2, 3, 4, 5, 6, 7, 8
]

export default function Videos () {
  return (
    <View style={[styles.container]}>
      <FlatList
        data={DATA}
        renderItem={() => <Text>1</Text>}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
