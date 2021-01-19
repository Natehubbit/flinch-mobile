import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-paper'
import Input from '../../components/Input'
import ForgotImage from '../../assets/images/forgot.svg'
import { maxHeight, maxWidth, Paragraph } from '../../common/styledComponents'
import { FormService } from '../../services/FormService'
import AuthService from '../../services/AuthService'
import { useDispatch } from 'react-redux'
import { toastActions } from '../../store/toast'
import { useNavigation } from '@react-navigation/native'

const ForgotPass = () => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const [proceed, setProceed] = useState(false)
  const [sending, setSending] = useState(false)
  const { goBack } = useNavigation()
  const onChange = (input:string) => {
    setEmail(input)
    setProceed(FormService.validateEmail(input))
  }
  const onProceed = async () => {
    setSending(true)
    const resetEmailSent = await AuthService.resetPass(email)
    if (resetEmailSent) {
      goBack()
      dispatch(toastActions
        .setToast({
          label: 'Okay',
          msg: 'Reset email sent.',
          show: true,
          mode: 'info'
        })
      )
    } else {
      dispatch(toastActions
        .setToast({
          label: 'Okay',
          msg: 'Failed to send reset email.',
          show: true,
          mode: 'danger'
        })
      )
    }
    setSending(false)
  }
  return (
    <SafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={[styles.container]}>
        <View style={[styles.header]}>
          <Text style={[styles.title]}>
            Forgot Password
          </Text>
        </View>
        <View style={[styles.backImage]}>
          <ForgotImage
            height={maxHeight * 0.2}
            width={maxWidth * 0.5}/>
        </View>
        <View
          style={[styles.content]}>
          <Paragraph black>
            Reset your password by entering your email
          </Paragraph>
          <Input
            placeholder='Email'
            keyboardType='email-address'
            onChangeText={onChange}
            value={email}
          />
          <View style={[styles.proceed]}>
            <FAB
              style={[styles.fab]}
              icon='arrow-right'
              disabled={!proceed || sending}
              onPress={onProceed}
              loading={sending}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPass

const styles = StyleSheet.create({
  container: {
    // height: maxHeight - 10
  },
  proceed: {
    height: 150,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10
  },
  content: {
    padding: 45,
    height: '100%'
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontFamily: 'SuezOne-Regular'
  },
  backImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  fab: {}
})
