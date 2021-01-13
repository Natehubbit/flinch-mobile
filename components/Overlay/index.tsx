import React, { useEffect } from 'react'
import { View, StyleSheet, BackHandler, Alert } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
// import { useDispatch } from 'react-redux'
import { Paragraph } from '../../common/styledComponents'
import { COLORS, theme } from '../../config/theme'
import { useSelect } from '../../hooks/selector'
import { useLoader } from '../../hooks/useLoader'
// import UploadHookService from '../../services/UploadHookService'
// import { loaderActions } from '../../store/loader'
// import { toastActions } from '../../store/toast'
import Selector from '../Selector'
import Toast from '../Toast'
import UploadModal from '../UploadModal'
interface AppOverlayProps {
  children: any;
}

const AppOverlay: React.FC<AppOverlayProps> = ({
  children,
  ...props
}) => {
  // const dispatch = useDispatch()
  const {
    paymentLoader: {
      isLoading: paymentLoader
    },
    responseLoader: {
      isLoading: responseLoader
    },
    authLoader: {
      isLoading: authLoader
    }
  } = useLoader()
  const {
    show: showSelector
  } = useSelect()
  const loading = paymentLoader ||
    responseLoader ||
      authLoader ||
        showSelector
  useEffect(() => {
    loading
      ? BackHandler
          .addEventListener('hardwareBackPress', onExit)
      : BackHandler
        .removeEventListener('hardwareBackPress', onExit)
    return () => BackHandler
      .removeEventListener('hardwareBackPress', onExit)
  }, [loading])

  const onExit = () => {
    if (loading) {
      Alert.alert(
        'Exit?',
        'Are you sure you want to exit Flinch?',
        [
          {
            text: 'Yes',
            onPress: () => BackHandler.exitApp()
          },
          {
            text: 'No',
            style: 'cancel'
          }
        ]
      )
    }
    return true
  }

  const renderSubmitting = () => {
    return <View style={[styles.submitting]}>
      <View style={[styles.submittingContent]}>
        <ActivityIndicator color={theme.colors.primary} style={[styles.submitLoader]}/>
        <Paragraph black>Submitting </Paragraph>
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
        {responseLoader &&
          <UploadModal/>}
        {authLoader && renderSubmitting()}
        <Selector />
      </View>}
      {/* TOASTS */}
      <Toast/>
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
  }
})
