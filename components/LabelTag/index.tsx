import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { theme } from '../../config/theme'

const LabelTag = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.label]}>Wedding</Text>
    </View>
  )
}

export default LabelTag

const styles = StyleSheet.create({
  container: {
    padding: 3,
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70
  },
  label: {
    fontSize: 10,
    fontFamily: 'Karla-Regular',
    color: 'white'
  }
})
