import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { RouteParams } from '../../navigation'

interface WebViewScreenProps {}

const WebViewScreen:React.FC<WebViewScreenProps> = () => {
  const { params } = useRoute<RouteProp<RouteParams, 'WebView'>>()
  const { goBack } = useNavigation()
  const { uri } = params
  if (!uri) {
    goBack()
    return null
  }
  return (
    <WebView
      onLoadEnd={params?.onStopLoading}
      pullToRefreshEnabled
      urlPrefixesForDefaultIntent={[]}
      style={styles.container}
      source={{ uri }}
      onError={params?.onStopLoading}
    />
  )
}

export default WebViewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
