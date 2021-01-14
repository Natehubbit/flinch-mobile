import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View
} from 'react-native'
import { Button } from 'react-native-paper'
import Bck from '../../assets/images/welcome.svg'
import {
  MainLabel,
  Paragraph
} from '../../common/styledComponents'
import { COLORS, theme } from '../../config/theme'
import { Routes } from '../../navigation'

const Welcome = () => {
  const { height } = useWindowDimensions()
  const { navigate } = useNavigation()
  const bckHeight = height * 0.4
  const onLogin = () => navigate<Routes>('Login')
  const onSignup = () =>
    navigate<Routes>('Signup')
  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[
          styles.container
        ]}>
        <View style={[styles.top]}>
          <Bck height={bckHeight} />
        </View>
        <View style={[styles.bottom]}>
          <View style={[styles.info]}>
            <MainLabel white>
              Get Started
            </MainLabel>
            <Paragraph>
              {'\n'}
              Please login or signup and get
              connected to the world class talents
              {'\n\n'}
            </Paragraph>
          </View>
          <Button
            mode="contained"
            uppercase={false}
            style={[styles.btn]}
            onPress={onSignup}
            theme={{
              colors: { primary: COLORS.white }
            }}>
            Signup
          </Button>
          <Button
            mode="contained"
            uppercase={false}
            style={[styles.loginBtn, styles.btn]}
            labelStyle={{ color: COLORS.white }}
            onPress={onLogin}
            theme={{
              colors: { primary: COLORS.white }
            }}>
            Login
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 50,
    elevation: 100
  },
  btn: {
    marginBottom: 25
  },
  loginBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.white,
    backgroundColor: theme.colors.primary
  },
  info: {
    marginTop: 30
  }
})
