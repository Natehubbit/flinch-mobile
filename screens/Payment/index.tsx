import React, { useState } from 'react'
import {
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { Alert, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { PaymentRouteProps } from '../../navigation'
import { theme } from '../../config/theme'
import Navbar from '../../components/Navbar'
import { ProgressBar } from 'react-native-paper'
import {
  WebViewNavigation,
  WebViewProgressEvent
} from 'react-native-webview/lib/WebViewTypes'
import { PAYMENT_CALLBACK } from '../../common/constants'
import { StackHeaderProps } from '@react-navigation/stack'

interface PaymentScreenProps
  extends StackHeaderProps {}

const Payment: React.FC<PaymentScreenProps> = ({
  navigation
}) => {
  const { params } = useRoute<
    PaymentRouteProps
  >()
  const [progress, setProgress] = useState(0)
  const { goBack } = useNavigation()
  const { uri } = params
  const showProgress = progress === 1
  if (!uri) {
    goBack()
    return null
  }
  const onProgress = (
    e: WebViewProgressEvent
  ) => {
    const { nativeEvent } = e
    setProgress(nativeEvent.progress)
  }
  const onComplete = () => {
    navigation.popToTop()
  }

  const onCallbackUrl = (
    e: WebViewNavigation
  ) => {
    const { url } = e
    const isCallback = url.includes(
      PAYMENT_CALLBACK
    )
    isCallback && onComplete()
  }

  const onError = () => {
    Alert.alert(
      'Error',
      'An error occured while loading payment widget.'
    )
    goBack()
  }

  return (
    <>
      <Navbar title="Make Payment" hideBell />
      <WebView
        incognito
        pullToRefreshEnabled
        urlPrefixesForDefaultIntent={[]}
        style={styles.container}
        onLoadProgress={onProgress}
        source={{ uri }}
        onError={onError}
        onNavigationStateChange={onCallbackUrl}
      />
      {!showProgress && (
        <ProgressBar progress={progress} />
      )}
    </>
  )
}

export default Payment

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 50,
    backgroundColor: theme.colors.primary
  }
})
