import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground
} from 'react-native'
import {
  FormContainer,
  FlexContainer,
  MainTitle,
  Paragraph,
  maxWidth,
  maxHeight,
  AuthContainer
} from '../../common/styledComponents'
import AuthInput from '../../components/Input'
import {
  Button
  // IconButton
} from 'react-native-paper'
// import { theme } from '../../config/theme'
import { useNavigation } from '@react-navigation/native'
import { userActions } from '../../store/user'
import { useDispatch } from 'react-redux'
import { Routes } from '../../navigation'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const onSignup = () => navigate<Routes>('Signup')
  const onShowPass = () => setShowPass(!showPass)
  const onForgot = () => navigate<Routes>('ForgotPass')
  const onLogin = async () => {
    dispatch(userActions.login(email, pass))
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/loginBack.jpg')}
        style={styles.background}
      />
      <AuthContainer keyboardShouldPersistTaps="handled">
        <FormContainer>
          <FlexContainer
            flex={1}
            justify="flex-end">
            <MainTitle>
              Welcome
            </MainTitle>
          </FlexContainer>
          <FlexContainer
            flex={1}
            justify="center">
            <Paragraph>
              Enter your details and get{'\n'}
              connected with your favorite
              celebrity.
            </Paragraph>
          </FlexContainer>
          <FlexContainer flex={2.5}>
            <AuthInput
              keyboardType="email-address"
              left="account"
              label="Email"
              onChangeText={setEmail}
            />
            <AuthInput
              left="lock"
              right="eye"
              label="Password"
              secureTextEntry={!showPass}
              onIconClicked={onShowPass}
              onChangeText={setPass}
            />
            <Paragraph
              style={[styles.forgot]}
              link
              onPress={onForgot}>
              Forgot password?
            </Paragraph>
          </FlexContainer>
          <FlexContainer
            justify="space-between"
            flex={2}>
            <FlexContainer>
              <Button
                uppercase={false}
                theme={{ roundness: 100 }}
                mode="contained"
                onPress={onLogin}>
                Login
              </Button>
            </FlexContainer>
            {/* <FlexContainer
              justify="center"
              align="center">
              <Paragraph>or</Paragraph>
            </FlexContainer>
            <FlexContainer
              justify="space-around"
              direction="row">
              <IconButton
                icon="google"
                color="red"
                style={styles.iconBack}
                onPress={() => console.log('hel')}
                rippleColor={theme.colors.primary}
              />
              <IconButton
                rippleColor={theme.colors.primary}
                icon="facebook"
                color="blue"
                style={styles.iconBack}
              />
            </FlexContainer> */}
            <FlexContainer
              direction="row"
              justify="center"
              align="center">
              <Paragraph>
                Don't have an account?
              </Paragraph>
              <Button
                labelStyle={styles.btnLabel}
                onPress={onSignup}
                uppercase={false}>
                SignUp
              </Button>
            </FlexContainer>
          </FlexContainer>
        </FormContainer>
      </AuthContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: 'absolute',
    height: maxHeight,
    width: maxWidth
  },
  iconBack: {
    backgroundColor: '#fff'
  },
  btnLabel: {
    marginHorizontal: 0
  },
  forgot: {
    textAlign: 'right',
    marginTop: 10
  }
})

export default Login
