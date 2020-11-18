import { useNavigation, useRoute } from '@react-navigation/native'
import { Audio } from 'expo-av'
import { Camera } from 'expo-camera'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import VideoBack from '../../assets/images/videoBack.svg'
import ButtonAction from '../../components/ButtonAction'
import { useToast } from '../../hooks/useToast'
import { Routes, UploadVideoScreenRouteProps } from '../../navigation'
import HelperService from '../../services/HelperService'
import { requestsActions } from '../../store/requests'
import { toastActions } from '../../store/toast'

const VideoUpload = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const [videoUri, setVideoUri] = useState('')
  const { params: { id } } = useRoute<UploadVideoScreenRouteProps>()
  const { navigate, reset } = useNavigation()
  useEffect(() => {
    console.log(videoUri)
    videoUri && onSend()
  }, [videoUri])
  const onReset = () => {
    reset({
      index: 0,
      routes: [{ name: 'Requests', key: null }]
    })
    setVideoUri('')
  }
  const onUploadVideo = async () => {
    await HelperService.uploadVideo(setVideoUri)
  }
  const onRecordVideo = async () => {
    const allowed = await requestPermission()
    allowed && navigate<Routes>('RecordVideo', { id })
  }
  const onSend = async () => {
    dispatch(toastActions.setToast({
      ...toast,
      show: false,
      onPress: send
    }))
    send()
  }
  const send = () => {
    dispatch(
      requestsActions
        .approveRequest(
          id,
          videoUri,
          10,
          onReset
        )
    )
  }
  const requestPermission = async () => {
    await Camera.getPermissionsAsync()
    const { status: videoPerm } = await Camera.requestPermissionsAsync()
    const { status: audioPerm } = await Audio.requestPermissionsAsync()
    return (videoPerm === 'granted' && audioPerm === 'granted')
  }
  return (
        <View style={styles.container}>
            <VideoBack/>
            <View style={styles.content}>
                <ButtonAction
                    icon='video-plus'
                    label='Record Video'
                    onPress={onRecordVideo}
                />
                <ButtonAction
                    onPress={onUploadVideo}
                    icon='cloud-upload'
                    label='Upload Video'
                />
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30
  },
  content: {
    width: '100%',
    paddingVertical: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})

// make this component available to the app
export default VideoUpload
