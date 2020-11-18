import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator, Button, ProgressBar, Snackbar } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { AltMiniLabel, maxWidth, Paragraph } from '../../common/styledComponents'
import { COLORS, theme } from '../../config/theme'
import { useLoader } from '../../hooks/useLoader'
import { useToast } from '../../hooks/useToast'
import UploadHookService from '../../services/UploadHookService'
import { loaderActions } from '../../store/loader'
import { toastActions } from '../../store/toast'
interface AppOverlayProps {
  children: any;
}

const AppOverlay: React.FC<AppOverlayProps> = ({
  children,
  ...p
}) => {
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0)
  const {
    paymentLoader,
    responseLoader,
    authLoader
  } = useLoader()
  const {
    onDismiss,
    onPress,
    msg,
    show,
    label
  } = useToast()
  useEffect(() => {
    const unsubscribe = UploadHookService.uploadHookRef &&
      UploadHookService.listen(
        setProgress,
        onUploadError,
        onUploadComplete
      )
    return () => unsubscribe && unsubscribe()
  }, [UploadHookService.uploadHookRef])
  const loading = paymentLoader || responseLoader
  const onUploadError = () => {
    dispatch(toastActions.setToast({
      label: 'Retry',
      msg: 'An Error Occured during upload...',
      show: true,
      onDismiss: onHideToast,
      onPress
    }))
  }
  const onHideToast = () => {
    dispatch(toastActions.resetToast())
  }
  const onHideUpload = () => {
    dispatch(loaderActions.loaded('responseLoader'))
    // NavigationService.reset('Home')
  }
  const onUploadComplete = () => {
    dispatch(
      toastActions.setToast({
        show: true,
        label: 'Okay',
        msg: 'Upload completed',
        onDismiss: onHideToast,
        onPress: onHideToast
      })
    )
  }

  const renderSubmitting = () => {
    return <View style={[styles.submitting]}>
      <View style={[styles.submittingContent]}>
        <ActivityIndicator color={theme.colors.primary} style={[styles.submitLoader]}/>
        <Paragraph black>Submitting </Paragraph>
      </View>
    </View>
  }
  const renderUploading = () => {
    return <View style={[styles.progressContainer]}>
      <AltMiniLabel black>
        Uploading
      </AltMiniLabel>
      <ProgressBar
        progress={progress}
        style={[styles.progressBar]}
        color={theme.colors.primary}
      />
      <View style={[styles.btns]}>
        <Button
          color={theme.colors.primary}
          onPress={onHideUpload}
        >
          Hide
        </Button>
        <Button
          onPress={() => UploadHookService.cancel()}
          color={COLORS.red}
        >
          Cancel
        </Button>
      </View>
    </View>
  }
  const renderLoader = () => {
    return <ActivityIndicator
      animating
      size="large"
      color={theme.colors.primary}
    />
  }
  return (
    <>
      {children}
      {/* LOADERS */}
      {loading && <View style={styles.container}>
        {paymentLoader && renderLoader()}
        {responseLoader && renderUploading()}
        {authLoader && renderSubmitting()}
      </View>}
      {/* TOASTS */}
      <Snackbar
        visible={show}
        onDismiss={onDismiss}
        action={{
          label,
          onPress
        }}
      >
        <AltMiniLabel>
          {msg}
        </AltMiniLabel>
      </Snackbar>
    </>
  )
}

export default AppOverlay

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  submitLoader: {
    marginRight: 10
  },
  submitting: {
    height: '25%',
    width: '70%',
    backgroundColor: COLORS.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submittingContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
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
