import { useNavigation, useRoute } from '@react-navigation/native'
import BackgroundTimer from 'react-native-background-timer'
import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { FAB, TouchableRipple } from 'react-native-paper'
import { maxWidth, Paragraph } from '../../common/styledComponents'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { Video } from 'expo-av'
import { Camera, CameraRecordingOptions } from 'expo-camera'
import { RecordVideoScreenRouteProps } from '../../navigation'
import { useDispatch } from 'react-redux'
import { requestsActions } from '../../store/requests'

const RECORD_OPTIONS:CameraRecordingOptions = {
  mute: false,
  maxDuration: 60
}

let time = 0
let timerId = null

// create a component
const VideoRecord = () => {
  const camera = useRef<Camera>(null)
  const dispatch = useDispatch()
  const { params: { id } } = useRoute<RecordVideoScreenRouteProps>()
  const [isRecording, setIsRecording] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [videoUri, setVideoUri] = useState('')
  const [timer, setTimer] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const { goBack, reset } = useNavigation()
  useEffect(() => {
    const cleanUp = async () => {
      if (isRecording) {
        resetTimer()
        BackgroundTimer.stopBackgroundTimer()
        camera.current.stopRecording()
      }
    }
    return () => {
      cleanUp()
    }
  }, [])
  const onGoBack = () => goBack()
  const onStopVideo = async () => {
    if (!camera.current) return
    setIsRecording(false)
    camera.current.stopRecording()
  }
  const onRecordVideo = async () => {
    if (camera.current && !isRecording) {
      try {
        resetTimer()
        setIsRecording(true)
        const promise = camera.current.recordAsync(RECORD_OPTIONS)
        startTimer()
        const data = await promise
        if (data) {
          const { uri } = data
          setIsRecording(false)
          setVideoUri(uri)
        }
        resetTimer()
        setIsPreviewing(true)
      } catch (e) {
        setIsRecording(false)
        resetTimer()
        alert(e.message)
      }
    }
  }
  const onPreviewClose = () => {
    if (showControls) return setShowControls(false)
    setIsPreviewing(false)
  }

  const onRecordAgain = () => {
    setIsPreviewing(false)
  }

  const onSubmitted = () => {
    reset({
      index: 0,
      routes: [{ name: 'Requests', key: null }]
    })
  }

  const onSend = async () => {
    dispatch(
      requestsActions
        .approveRequest(
          id,
          videoUri,
          timer,
          onSubmitted
        )
    )
  }
  const startTimer = () => {
    timerId = setInterval(() => {
      time = time + 1
      setTimer(time)
    }, 1000)
  }
  const resetTimer = () => {
    time = 0
    setTimer(0)
    timerId && clearInterval(timerId)
  }
  return (
        <View style={styles.container}>
            <View style={styles.nav}>
                {(isRecording || isPreviewing)
                  ? null
                  : <FAB
                    icon="arrow-left"
                    style={styles.icon}
                    small
                    onPress={onGoBack}
                />}
                {isRecording && <View style={styles.recording}>
                    <View style={styles.recordingText}>
                        <Paragraph>Recording</Paragraph>
                        <View style={styles.recordIndicator}/>
                    </View>
                </View>}
            </View>
            {!isPreviewing &&
            <Camera
                style={styles.camera}
                type={Camera.Constants.Type.front}
                ref={camera}
                ratio='16:9'
            />}
            {(isPreviewing) &&
            <View style={styles.videoContainer}>
                <View>
                    <FAB
                        icon='close'
                        style={styles.close}
                        onPress={onPreviewClose}
                        small
                    />
                </View>
                <Video
                    source={{ uri: videoUri }}
                    style={styles.video}
                    isLooping
                    shouldPlay
                    resizeMode='cover'
                />
                <FAB
                    icon='send'
                    style={styles.send}
                    onPress={onSend}
                />
                {!showControls &&
                <FAB
                    icon='refresh'
                    style={styles.save}
                    label='Record again'
                    small
                    onPress={onRecordAgain}
                />}
            </View>}
            <View style={styles.content}>
                {!isRecording && !isPreviewing &&
                <View style={styles.recordButton}>
                    <TouchableRipple
                        style={{ flex: 1 }}
                        onPress={onRecordVideo}>
                        <View/>
                    </TouchableRipple>
                </View>}
                {isRecording && <View style={styles.recordBtns}>
                    <View style={styles.miniBtn}>
                        <TouchableRipple
                            style={styles.miniBtn}
                            onPress={null}>
                            <Icon size={35} color='#fff' name='pause' />
                        </TouchableRipple>
                    </View>
                    <View style={styles.stopBtn}>
                        <TouchableRipple
                            style={styles.stopBtn}
                            onPress={onStopVideo}>
                            <Icon size={50} name='stop' />
                        </TouchableRipple>
                    </View>
                    <View style={styles.miniBtn}>
                        <TouchableRipple
                            style={styles.miniBtn}
                            onPress={null}>
                            <Paragraph>{time}s</Paragraph>
                        </TouchableRipple>
                    </View>
                </View>}
            </View>
        </View>
  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  camera: {
    // flex:1,
    // height: '100%',
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  icon: {
    margin: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
    elevation: 0
  },
  recordButton: {
    backgroundColor: '#F35D6F',
    width: 72,
    height: 72,
    borderRadius: 100,
    overflow: 'hidden',
    alignSelf: 'center',
    margin: 12
  },
  ripple: {
    height: '100%',
    width: '100%'
  },
  recording: {
    flexDirection: 'row',
    top: 18,
    right: 12,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 100
    // height:50,
    // paddingHorizontal:0,
  },
  recordingText: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10
  },
  recordIndicator: {
    height: 15,
    width: 15,
    backgroundColor: 'red',
    marginLeft: 10,
    borderRadius: 100
  },
  recordBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stopBtn: {
    backgroundColor: '#fff',
    width: 72,
    height: 72,
    borderRadius: 100,
    overflow: 'hidden',
    alignSelf: 'center',
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  miniBtn: {
    height: 54,
    width: 54,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoContainer: {
    position: 'absolute',
    height: '100%',
    width: maxWidth,
    zIndex: 2
  },
  video: {
    height: '100%',
    width: '100%'
  },
  close: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    elevation: 0,
    zIndex: 1,
    left: 12,
    top: 12
  },
  send: {
    position: 'absolute',
    bottom: 12,
    right: 12
  },
  save: {
    position: 'absolute',
    elevation: 0,
    left: 12,
    bottom: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

// make this component available to the app
export default VideoRecord
