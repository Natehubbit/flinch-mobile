import React from 'react'
import { Video } from 'expo-av'
import { StyleSheet } from 'react-native'
import { COLORS } from '../../config/theme'

interface VideoPlayerProps {
  uri: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  uri
}) => {
  return (
    <Video
      source={{ uri }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode={Video.RESIZE_MODE_CONTAIN}
      shouldPlay
      isLooping
      // useNativeControls
      style={[styles.container]}
      rotation={0}
      // usePoster
      // posterSource={img}
    />
  )
}

export default VideoPlayer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark
  }
})
