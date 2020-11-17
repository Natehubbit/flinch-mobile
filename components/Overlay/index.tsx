import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator, Button, ProgressBar } from 'react-native-paper'
import { AltMiniLabel, maxWidth, Paragraph } from '../../common/styledComponents'
import { COLORS, theme } from '../../config/theme'
import { useLoader } from '../../hooks/useLoader'
import UploadHookService from '../../services/UploadHookService'

interface AppOverlayProps {
  children: any;
}

const AppOverlay: React.FC<AppOverlayProps> = ({
  children
}) => {
  const [progress, setProgress] = useState(0)
  const {
    paymentLoader,
    responseLoader,
    authLoader
  } = useLoader()
  useEffect(() => {
    const unsubscribe = UploadHookService.uploadHookRef &&
      UploadHookService.listen(setProgress)
    return () => unsubscribe && unsubscribe()
  }, [UploadHookService.uploadHookRef])
  const loading = paymentLoader || responseLoader
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
      <Button
        icon='close'
        mode='contained'
        onPress={() => UploadHookService.cancel()}
        color={COLORS.red}
      >
        Cancel
      </Button>
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
      {loading && <View style={styles.container}>
        {paymentLoader && renderLoader()}
        {responseLoader && renderUploading()}
        {authLoader && renderSubmitting()}
      </View>}
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
    height: '25%',
    width: '80%',
    borderRadius: 5
  }
})
