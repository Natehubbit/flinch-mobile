import React, { useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { RouteParams } from '../../navigation'
import { theme } from '../../config/theme'
import Navbar from '../../components/Navbar'
import { ProgressBar } from 'react-native-paper'
import { WebViewNavigation, WebViewProgressEvent } from 'react-native-webview/lib/WebViewTypes'
import { PAYMENT_CALLBACK } from '../../common/constants'
import { StackHeaderProps } from '@react-navigation/stack'

interface WebViewScreenProps extends StackHeaderProps {
}

const WebViewScreen:React.FC<WebViewScreenProps> = ({
  navigation
}) => {
  const { params } = useRoute<RouteProp<RouteParams, 'WebView'>>()
  const [progress, setProgress] = useState(0)
  const {
    goBack
  } = useNavigation()
  const { uri } = params
  const showProgress = progress === 1
  if (!uri) {
    goBack()
    return null
  }
  const onProgress = (e:WebViewProgressEvent) => {
    const { nativeEvent } = e
    setProgress(nativeEvent.progress)
  }
  const onComplete = () => {
    navigation.popToTop()
  }

  const onCallbackUrl = (e:WebViewNavigation) => {
    const { url } = e
    const isCallback = url.includes(PAYMENT_CALLBACK)
    isCallback && onComplete()
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
        onNavigationStateChange={onCallbackUrl}
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
