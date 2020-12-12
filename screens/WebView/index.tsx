import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { RouteParams } from '../../navigation'
import PaymentService from '../../services/PaymentService'
import { useRequest } from '../../hooks/useRequest'
import { useDispatch } from 'react-redux'
import { toastActions } from '../../store/toast'
import { theme } from '../../config/theme'
import Navbar from '../../components/Navbar'
import { ProgressBar } from 'react-native-paper'
import { WebViewProgressEvent } from 'react-native-webview/lib/WebViewTypes'

interface WebViewScreenProps {}

const WebViewScreen:React.FC<WebViewScreenProps> = () => {
  const dispatch = useDispatch()
  const { params } = useRoute<RouteProp<RouteParams, 'WebView'>>()
  const [progress, setProgress] = useState(0)
  const { goBack, reset } = useNavigation()
  const { uri } = params
  const { id } = useRequest()
  const showProgress = progress === 1
  if (!uri) {
    goBack()
    return null
  }
  useEffect(() => {
    PaymentService.onPayed(id, onComplete)
  }, [])
  const onProgress = (e:WebViewProgressEvent) => {
    const { nativeEvent } = e
    setProgress(nativeEvent.progress)
  }
  const onComplete = () => {
    reset({
      index: 0,
      routes: [{ name: 'Home', key: null }]
    })
    dispatch(toastActions.setToast({
      label: 'Completed',
      msg: 'Payment Completed',
      show: true,
      duration: 10000,
      onDismiss: () => dispatch(toastActions.resetToast()),
      onPress: () => dispatch(toastActions.resetToast())
    }))
  }
  return (
    <>
      <Navbar title='Make Payment'/>
      <WebView
        onLoadEnd={params?.onStopLoading}
        incognito
        pullToRefreshEnabled
        urlPrefixesForDefaultIntent={[]}
        style={styles.container}
        onLoadProgress={onProgress}
        source={{ uri }}
        onError={params?.onStopLoading}
        // onNavigationStateChange={e=>{}}
      />
      {!showProgress && <ProgressBar progress={progress} />}
    </>
  )
}

export default WebViewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 50,
    backgroundColor: theme.colors.primary
  }
})
