import React from 'react'
import { Video } from 'expo-av'
import { StyleSheet } from 'react-native'
import { COLORS } from '../../config/theme'

export default function VideoPlayer () {
  return (
    <Video
      source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="contain"
      shouldPlay
      isLooping
      useNativeControls
      style={[styles.container]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark
  }
})
