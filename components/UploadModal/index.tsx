import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, ProgressBar } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { AltMiniLabel, maxWidth } from '../../common/styledComponents'
import { COLORS, theme } from '../../config/theme'
import { useLoader } from '../../hooks/useLoader'
import UploadHookService from '../../services/UploadHookService'
import { loaderActions } from '../../store/loader'
import { toastActions } from '../../store/toast'

const UploadModal = () => {
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0)
  const {
    responseLoader: {
      label,
      showBtns,
      type
    }
  } = useLoader()
  useEffect(() => {
    const unsubscribe = UploadHookService
      .uploadHookRef &&
        UploadHookService.listen(
          setProgress,
          onUploadError
        )
    return () => unsubscribe &&
      unsubscribe()
  }, [UploadHookService.uploadHookRef])
  const onUploadError = () => {
    dispatch(toastActions
      .setToast({
        label: 'Retry',
        msg: 'An Error Occured...',
        show: true,
        onDismiss: onHideToast
      }))
  }
  const onHideToast = () => {
    dispatch(toastActions.resetToast())
  }
  const onHideUpload = () => {
    dispatch(loaderActions
      .loaded('responseLoader'))
  }
  const isProgress = type === 'progress'
  return (
    <View style={[styles.progressContainer]}>
      <AltMiniLabel>
        {label}
      </AltMiniLabel>
      {isProgress
        ? <ProgressBar
        progress={progress}
        style={[styles.progressBar]}
        color={theme.colors.primary}
      />
        : <ActivityIndicator
        animating
        size='large'
        color={theme.colors.primary}
      />
      }
      <View style={[styles.btns]}>
      {showBtns &&
      <>
        <Button
          color={theme.colors.primary}
          onPress={onHideUpload}
        >
          Hide
        </Button>
        <Button
          onPress={() => UploadHookService
            .cancel(onHideUpload)
          }
          color={COLORS.red}
        >
          Cancel
        </Button>
      </>}
      </View>
    </View>
  )
}

export default UploadModal

const styles = StyleSheet.create({
  progressBar: {
    width: maxWidth * 0.5,
    height: 5
  },
  progressContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
    height: '30%',
    width: '80%',
    borderRadius: 5
  },
  btns: {
    flexDirection: 'row'
  }
})
