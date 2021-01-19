import {
  useNavigation,
  useRoute
} from '@react-navigation/native'
import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import {
  Button,
  FAB,
  TouchableRipple
} from 'react-native-paper'
import {
  maxWidth,
  Paragraph
} from '../../common/styledComponents'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { Video } from 'expo-av'
import {
  Camera,
  CameraRecordingOptions
} from 'expo-camera'
import { RecordVideoScreenRouteProps } from '../../navigation'
import { useDispatch } from 'react-redux'
import { requestsActions } from '../../store/requests'
import { useToast } from '../../hooks/useToast'
import { toastActions } from '../../store/toast'
import { COLORS } from '../../config/theme'
import RequestService from '../../services/RequestService'
import { StackHeaderProps } from '@react-navigation/stack'

interface VideoRecordScreenProps
  extends StackHeaderProps {

  }

const RECORD_OPTIONS: CameraRecordingOptions = {
  mute: false,
  maxDuration: 60,
  quality: Camera.Constants.VideoQuality['480p']
}

let timerId = null

const VideoRecord: React.FC<VideoRecordScreenProps> = ({
  navigation
}) => {
  const camera = useRef<Camera>(null)
  const dispatch = useDispatch()
  const toast = useToast()
  const [info, setInfo] = useState<
    {instructions:string, recipient:string} | null
  >(null)
  const {
    params: { id }
  } = useRoute<RecordVideoScreenRouteProps>()
  const [isRecording, setIsRecording] = useState(
    false
  )
  const [
    showInstructions,
    setShowInstructions
  ] = useState(true)
  const [ratio, setRatio] = useState('16:9')
  const [
    isPreviewing,
    setIsPreviewing
  ] = useState(false)
  const [videoUri, setVideoUri] = useState('')
  const [timer, setTimer] = useState(61)
  const [cameraView, setCameraView] = useState(
    Camera.Constants.Type.front
  )
  const [
    showControls,
    setShowControls
  ] = useState(false)
  const { goBack } = useNavigation()
  const { instructions, recipient } =
    info || { instructions: '', recipient: '' }
  useEffect(() => {
    const cleanUp = async () => {
      if (isRecording) {
        resetTimer()
        camera.current &&
        camera.current.stopRecording()
      }
    }
    getRequestData()
    return () => {
      cleanUp()
    }
  }, [])
  const onHideInstructions = () => {
    setShowInstructions(false)
  }
  const onShowInstructions = () => {
    setShowInstructions(true)
  }
  const onRotateCamera = () => {
    if (
      cameraView === Camera.Constants.Type.front
    ) {
      setCameraView(Camera.Constants.Type.back)
    } else {
      setCameraView(Camera.Constants.Type.front)
    }
  }
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
        const promise = camera.current.recordAsync(
          RECORD_OPTIONS
        )
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
    if (showControls) {
      return setShowControls(false)
    }
    setIsPreviewing(false)
  }

  const onRecordAgain = () => {
    setIsPreviewing(false)
  }

  const onSend = async () => {
    dispatch(
      toastActions.setToast({
        ...toast,
        show: false
      })
    )
    send()
  }

  const onCameraReady = async () => {
    await setCameraRatio()
  }

  const send = () => {
    const callback = () =>
      navigation.popToTop()
    dispatch(
      requestsActions.approveRequest(id, videoUri, callback)
    )
  }

  const getRequestData = async () => {
    const data = await RequestService.getRequest(id)
    data && setInfo({
      instructions: data.instructions,
      recipient: data.recipient
    })
  }

  const startTimer = () => {
    timerId = setInterval(() => {
      setTimer((t) => t - 1)
    }, 1000)
  }
  const resetTimer = () => {
    setTimer(61)
    timerId && clearInterval(timerId)
  }

  const setCameraRatio = async () => {
    if (camera.current) {
      const ratioData = await camera
        .current
        .getSupportedRatiosAsync()
      const res = ratioData.pop()
      setRatio(res)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {isRecording || isPreviewing ? null : (
          <FAB
            icon="arrow-left"
            style={styles.icon}
            small
            onPress={onGoBack}
          />
        )}
        {isRecording && (
          <View style={styles.recording}>
            <View style={styles.recordingText}>
              <Paragraph>Recording</Paragraph>
              <View
                style={styles.recordIndicator}
              />
            </View>
          </View>
        )}
        {!showInstructions &&
          !isPreviewing &&
          !isRecording && (
            <FAB
              icon="eye-outline"
              style={[styles.showIcon]}
              small
              onPress={onShowInstructions}
            />
          )}
      </View>
      {!isPreviewing && (
        <View style={styles.camera}>
          {showInstructions && (
            <View style={[styles.instructions]}>
              <ScrollView style={[styles.scroll]}>
                <Paragraph>
                  Receipient: {recipient}
                  {'\n'}
                </Paragraph>
                <Paragraph>
                  {instructions}
                </Paragraph>
              </ScrollView>
              <Button
                uppercase={false}
                icon="eye-off-outline"
                onPress={onHideInstructions}>
                Hide
              </Button>
            </View>
          )}
          <Camera
            onCameraReady={onCameraReady}
            style={[styles.cameraModule]}
            type={cameraView}
            ref={camera}
            ratio={ratio}
          />
        </View>
      )}
      {isPreviewing && (
        <View style={styles.videoContainer}>
          <View>
            <FAB
              icon="close"
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
            resizeMode="cover"
          />
          <FAB
            icon="send"
            style={styles.send}
            onPress={onSend}
          />
          {!showControls && (
            <FAB
              icon="refresh"
              style={styles.save}
              label="Record again"
              small
              onPress={onRecordAgain}
            />
          )}
        </View>
      )}
      <View style={styles.content}>
        {!isRecording && !isPreviewing && (
          <View style={[styles.recordContainer]}>
            <View style={styles.recordButton}>
              <TouchableRipple
                style={{ flex: 1 }}
                onPress={onRecordVideo}>
                <View />
              </TouchableRipple>
            </View>
            <FAB
              icon="camera-retake-outline"
              style={[styles.rotateBtn]}
              onPress={onRotateCamera}
            />
          </View>
        )}
        {isRecording && (
          <View style={styles.recordBtns}>
            {!showInstructions && (
              <FAB
                icon="eye-outline"
                style={[styles.showIconBottom]}
                small
                onPress={onShowInstructions}
              />
            )}
            <View style={styles.stopBtn}>
              <TouchableRipple
                style={styles.stopBtn}
                onPress={onStopVideo}>
                <Icon size={50} name="stop" />
              </TouchableRipple>
            </View>
            <View style={styles.miniBtn}>
              <TouchableRipple
                style={styles.miniBtn}
                onPress={null}>
                <Paragraph>{timer}s</Paragraph>
              </TouchableRipple>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  camera: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center'
  },
  instructions: {
    position: 'absolute',
    top: 80,
    minHeight: 100,
    padding: 15,
    width: '100%',
    backgroundColor: COLORS.light,
    zIndex: 10
  },
  cameraModule: {
    flex: 1
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
  recordContainer: {
    justifyContent: 'center'
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
  rotateBtn: {
    position: 'absolute',
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    elevation: 0
  },
  scroll: {
    maxHeight: 180,
    marginBottom: 25
  },
  showIcon: {
    right: 12
  },
  showIconBottom: {
    // position: 'absolute',
    // left: 15
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
