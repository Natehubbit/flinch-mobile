import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, ImageBackground, useWindowDimensions, View, Image } from 'react-native'
import { PROFILE_FORM } from '../../common/constants'
import { AltMiniLabel, Paragraph } from '../../common/styledComponents'
import Input from '../../components/Input'
import { useUser } from '../../hooks/useUser'
import { IconButton } from 'react-native-paper'
import { COLORS } from '../../config/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Button from '../../components/Button'

const bck = require('../../assets/images/profileBck.png')

const Profile = () => {
  const [editting, setEditting] = useState(false)
  const { height, width } = useWindowDimensions()
  const {
    imageUrl,
    displayName: name,
    email
  } = useUser()
  const imgHeight = height * 0.2
  const onEditting = () => {
    setEditting(true)
  }
  const onSave = () => {

  }
  const onCancel = () => {
    setEditting(false)
  }
  return (
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
          {!editting
            ? <IconButton
              icon='account-edit'
              color={COLORS.white}
              style={[styles.editIcon]}
              onPress={onEditting}
            />
            : <IconButton
              icon='close'
              onPress={onCancel}
              color={COLORS.dark}
              style={[styles.editIcon]}
            />
          }
        </View>
        <View style={[styles.imgContainer]}>
          <View style={[styles.dp]}>
              <>
                <TouchableOpacity
                  onPress={() => console.log('heo')}
                >
                <Image
                  source={{ uri: imageUrl }}
                  style={[styles.img]}
                />
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
            {PROFILE_FORM.map((d, i) => (
              <Input
                key={i}
                placeholder={d.placeholder}
                left={d.left}
                right={d.right}
                disabled={!editting}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      {editting && <View style={[styles.actions]}>
        <Button
          label='Save'
          onPress={onSave}
        />
      </View>}
    </SafeAreaView>
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
    padding: 10,
    elevation: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center'
  }
})
