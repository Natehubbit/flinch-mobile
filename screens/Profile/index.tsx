import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, ImageBackground, useWindowDimensions, View, Image } from 'react-native'
import { PROFILE_FORM } from '../../common/constants'
import { AltMiniLabel, Paragraph } from '../../common/styledComponents'
import Input from '../../components/Input'
import { useUser } from '../../hooks/useUser'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Navbar from '../../components/Navbar'
import { useRoute } from '@react-navigation/native'
import { Button, HelperText } from 'react-native-paper'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { COLORS } from '../../config/theme'
import HelperService from '../../services/HelperService'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/user'
import { useLoader } from '../../hooks/useLoader'

const bck = require('../../assets/images/profileBck.png')

const Profile = () => {
  const dispatch = useDispatch()
  const { authLoader: loading } = useLoader()
  const [editting, setEditting] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [imgUri, setImgUri] = useState(null)
  const [password, setPassword] = useState('')
  const { height, width } = useWindowDimensions()
  const { name: route } = useRoute()
  const {
    id,
    imageUrl,
    displayName: name,
    email
  } = useUser()
  const [userName, setUserName] = useState(
    editting
      ? name
      : ''
  )
  const [userEmail, setUserEmail] = useState(
    editting
      ? email
      : ''
  )
  useEffect(() => {
    editting
      ? initData()
      : clearData()
  }, [editting])
  useEffect(() => {
    !loading && !submitting &&
      setEditting(false)
  }, [loading, submitting])
  const imgHeight = height * 0.2
  const img = imgUri || imageUrl
  const showPass =
    !((userEmail === '') ||
    (userEmail === email)) &&
    editting
  const onEditting = () => {
    setEditting(true)
  }
  const onUpdateImg = () => {
    HelperService.uploadPhoto(setImgUri)
  }
  const onSave = () => {
    setSubmitting(true)
    const data = userEmail === email
      ? {
          id,
          displayName: userName,
          imageUrl: img
        }
      : {
          id,
          displayName: userName,
          email: userEmail,
          imageUrl: img
        }
    showPass
      ? dispatch(
          userActions.update(data, password)
        )
      : dispatch(
        userActions.update(data)
      )
    setSubmitting(false)
  }
  const onCancel = () => {
    setEditting(false)
  }
  const initData = () => {
    setUserEmail(email)
    setUserName(name)
  }
  const clearData = () => {
    setUserEmail('')
    setUserName('')
  }
  return (
    <>
      <Navbar
        edit
        title={route}
        hideBell
        showCancel={editting}
        onEdit={onEditting}
        onCancel={onCancel}
      />
      <SafeAreaView style={[styles.container]}>
        <ScrollView>
          <View
            style={[
              { width, height: imgHeight }
            ]}
          >
            <ImageBackground
              style={{ flex: 1 }}
              source={bck}
            />
          </View>
          <View style={[styles.imgContainer]}>
            <View style={[styles.dp]}>
                <>
                  <TouchableOpacity
                    disabled={!editting}
                    onPress={onUpdateImg}
                  >
                  <Image
                    source={{ uri: img }}
                    style={[styles.img]}
                  />
                  {editting && <View style={[styles.overlay]}>
                    <Icon
                      name='plus-circle-outline'
                      size={25}
                      color={COLORS.white}
                    />
                  </View>}
                  </TouchableOpacity>
                </>
            </View>
          </View>
          <View style={[styles.content]}>
            <View style={[styles.profileInfo]}>
              <AltMiniLabel>
                {name}
              </AltMiniLabel>
              <Paragraph light>
                {email}
              </Paragraph>
            </View>
            <View style={[styles.form]}>
              {PROFILE_FORM.map((d, i) => {
                const val = d.type === 'name'
                  ? userName
                  : d.type === 'email'
                    ? userEmail
                    : password
                const onChange = d.type === 'name'
                  ? setUserName
                  : d.type === 'email'
                    ? setUserEmail
                    : setPassword
                const isPass = d.type === 'password'
                return (isPass)
                  ? showPass &&
                    <>
                      <Input
                        key={i}
                        placeholder={d.placeholder}
                        left={d.left}
                        right={d.right}
                        disabled={!editting}
                        value={val}
                        secureTextEntry={isPass}
                        onChangeText={onChange}
                      />
                      <HelperText type='error'>
                        Enter your password if you are updating your email.
                      </HelperText>
                    </>
                  : <Input
                      key={i}
                      placeholder={d.placeholder}
                      left={d.left}
                      right={d.right}
                      disabled={!editting}
                      value={val}
                      onChangeText={onChange}
                    />
              })}
            </View>
          </View>
        </ScrollView>
        {editting && <View style={[styles.actions]}>
          <Button
            uppercase={false}
            mode='contained'
            style={[styles.btn]}
            onPress={onSave}
          >
            Save
          </Button>
        </View>}
      </SafeAreaView>
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imgContainer: {
    height: 25,
    width: 107,
    alignSelf: 'center'
  },
  dp: {
    height: 107,
    width: 107,
    borderRadius: 100,
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    zIndex: 10
  },
  content: {
  },
  profileInfo: {
    alignItems: 'center'
  },
  form: {
    paddingHorizontal: 40,
    paddingVertical: 15
  },
  overlay: {
    position: 'absolute',
    borderRadius: 100,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editIcon: {
    position: 'absolute',
    right: 2,
    top: 2,
    zIndex: 10,
    padding: 5,
    elevation: 0
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 100
  },
  actions: {
    paddingVertical: 15,
    elevation: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 40
  },
  btn: {
    borderRadius: 100
  }
})
