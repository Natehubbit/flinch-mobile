/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react'
import {
  LogBox,
  StatusBar,
  Image
} from 'react-native'
import { Provider } from 'react-redux'
import * as ScreenOrientation from 'expo-screen-orientation'

import { Provider as PaperProvider } from 'react-native-paper'

import { theme } from './config/theme'
import Navigation from './navigation'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import * as Font from 'expo-font'
import { Asset } from 'expo-asset'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AppLoading } from 'expo'
import AppOverlay from './components/Overlay'

function cacheImages(
  images: Array<string | number>
) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(
        image
      ).downloadAsync()
    }
  })
}

function cacheFonts(
  fonts: Array<
    | string
    | { [fontFamily: string]: Font.FontSource }
  >
) {
  return fonts.map((font) => Font.loadAsync(font))
}

const App: () => React.ReactNode = () => {
  const [appReady, setAppReady] = useState(false)
  useEffect(() => {
    LogBox.ignoreLogs([
      'Setting',
      'Require cycle:'
    ])
    lockScreen()
  }, [])
  const lockScreen = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    )
  }

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('./assets/images/profileBck.png')
    ])

    const fontAssets = cacheFonts([
      MaterialCommunityIcons.font,
      {
        'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf')
      },
      {
        'Rubik-SemiBold': require('./assets/fonts/Rubik-SemiBold.ttf')
      },
      {
        'SuezOne-Regular': require('./assets/fonts/SuezOne-Regular.ttf')
      },
      {
        'MontserratAlternates-Bold': require('./assets/fonts/MontserratAlternates-Bold.ttf')
      },
      {
        'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf')
      }
    ])

    await Promise.all([
      ...(imageAssets as any),
      ...fontAssets
    ])
  }
  return !appReady ? (
    <AppLoading
      startAsync={loadAssetsAsync}
      onFinish={() => setAppReady(true)}
      onError={console.warn}
    />
  ) : (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <AppOverlay>
          <PaperProvider theme={theme}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={
                theme.colors.primary
              }
            />
            <Navigation />
          </PaperProvider>
        </AppOverlay>
      </PersistGate>
    </Provider>
  )
}

export default App
