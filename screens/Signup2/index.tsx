import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  FAB,
  HelperText
} from 'react-native-paper'
import {
  maxHeight
} from '../../common/styledComponents'
import Avatar from '../../components/Avatar'
import Input from '../../components/Input'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/user'
import { useLoader } from '../../hooks/useLoader'
import HelperService from '../../services/HelperService'
import { useRoute } from '@react-navigation/native'

const Signup2: React.FC = () => {
  const dispatch = useDispatch()
  const {
    authLoader: {
      isLoading: authLoader
    }
  } = useLoader()
  const [name, setName] = useState('')
  const [imgUri, setImgUri] = useState('')
  const enableSubmit = !!name && !!imgUri
  const {
    email,
    pass
  } = useRoute().params as {
    email:string,
    pass:string
  }
  const onProceed = () => {
    dispatch(
      userActions.signup(pass || '', {
          displayName: name,
          imageUrl: imgUri,
          email: email || ''
        }
      )
    )
  }
  const onUploadImage = () =>
    HelperService.uploadPhoto(setImgUri)

  const onInput = (input: string) => {
    if (input) {
      return setName(input)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scroll]}>
        <View style={[styles.header]}>
          <Text style={[styles.title]}>
            Create Profile
          </Text>
        </View>
        <View
          style={styles.avatarContainer}>
          <Avatar
            onPress={onUploadImage}
            source={imgUri}
          />
          <HelperText type="info">
            {'\n'}Add Image{'\n'}
          </HelperText>
        </View>
        <Input
          label="Username"
          left="account"
          onChangeText={onInput}
        />
        <FAB
          style={styles.fab}
          icon="arrow-right"
          onPress={onProceed}
          disabled={!enableSubmit}
          loading={authLoader}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    minHeight: maxHeight - 25,
    paddingHorizontal: 40
  },
  content: {
    height: maxHeight,
    backgroundColor: 'blue'
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%'
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'SuezOne-Regular'
  },
  header: {
    height: 80,
    justifyContent: 'center'
  }
})

export default Signup2
