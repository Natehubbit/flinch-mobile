import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { FAB, HelperText } from 'react-native-paper'
import { AuthContainer2, FlexContainer, maxHeight } from '../../common/styledComponents'
import Avatar from '../../components/Avatar'
import Input from '../../components/Input'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/user'
import { useUser } from '../../hooks/useUser'
import { useLoader } from '../../hooks/useLoader'
import HelperService from '../../services/HelperService'

const Signup2: React.FC = () => {
  const dispatch = useDispatch()
  const user = useUser()
  const { authLoader } = useLoader()
  const [name, setName] = useState('')
  const [submit, setSubmit] = useState(false)
  const [imgUri, setImgUri] = useState('')
  const onProceed = () => {
    dispatch(
      userActions.update({
        ...user,
        displayName: name,
        imageUrl: imgUri
      })
    )
  }
  const onUploadImage = () => HelperService.uploadPhoto(setImgUri)
  const onInput = (input:string) => {
    if (input) {
      setSubmit(true)
      return setName(input)
    }
    return setSubmit(false)
  }
  return (
        <SafeAreaView style={styles.container}>
            <AuthContainer2>
                <FlexContainer
                    style={styles.flexContainer}
                    align='center'
                    justify='center'>
                    <Avatar
                        onPress={onUploadImage}
                        source={imgUri}
                    />
                    <HelperText type='info'>{'\n'}Add Image{'\n'}</HelperText>
                </FlexContainer>
                <FlexContainer flex={2}>
                    <Input
                        label='Username'
                        left='account'
                        onChangeText={onInput}
                    />
                    <FAB
                        style={styles.fab}
                        icon='arrow-right'
                        onPress={onProceed}
                        disabled={!submit}
                        loading={authLoader}
                    />
                </FlexContainer>
            </AuthContainer2>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: maxHeight,
    backgroundColor: 'blue'
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 0
  },
  flexContainer: {
    marginTop: 50
  }
})

export default Signup2
