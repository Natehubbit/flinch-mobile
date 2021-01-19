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
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../../navigation'
import { useDispatch } from 'react-redux'
import { toastActions } from '../../store/toast'

const Signup: React.FC = () => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const onLogin = () => navigate<Routes>('Login')
  const onShowPass = () => setShowPass(!showPass)
  const hasDetails = !!email && !!pass
  const onSignup = async () => {
    hasDetails
    ? navigate<Routes>('Signup2', { email, pass })
    : dispatch(toastActions.setToast({
      label: 'Okay',
      msg: 'Please enter your email and password',
      show: true,
      mode: 'danger'
    }))
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
            flex={1.25}
            justify="flex-end">
            <MainTitle>
              Create {'\n'} your Account
            </MainTitle>
          </FlexContainer>
          <FlexContainer
            flex={1}
            justify="center">
            <Paragraph>
              Create an account and get{'\n'}
              connected with your favorite
              celebrity.
            </Paragraph>
          </FlexContainer>
          <FlexContainer flex={3}>
            <AuthInput
              keyboardType="email-address"
              left="account"
              label="Email"
              value={email}
              onChangeText={setEmail}
            />
            <AuthInput
              left="lock"
              right="eye"
              label="Password"
              value={pass}
              onChangeText={setPass}
              secureTextEntry={!showPass}
              onIconClicked={onShowPass}
            />
          </FlexContainer>
          <FlexContainer
            justify="space-between"
            flex={2}>
            <FlexContainer>
              <Button
                theme={{ roundness: 100 }}
                mode="contained"
                uppercase={false}
                onPress={onSignup}>
                SignUp
              </Button>
            </FlexContainer>
            <FlexContainer
              direction="row"
              justify="center"
              align="center">
              <Paragraph>
                Don't have an account?
              </Paragraph>
              <Button
                labelStyle={styles.btnLabel}
                onPress={onLogin}
                uppercase={false}>
                Login
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
    backgroundColor: 'white'
  },
  btnLabel: {
    marginHorizontal: 0
  }
})

export default Signup
