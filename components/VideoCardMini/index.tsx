import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { useUser } from '../../hooks/useUser'
import LabelTag from '../LabelTag'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { COLORS } from '../../config/theme'

export default function VideoCardMini () {
  const { imageUrl: uri } = useUser()
  return (
    <View style={[styles.container]}>
        <TouchableRipple
          style={[styles.content]}
        >
          <>
          <Image
            source={{ uri }}
            style={[styles.img]}
          />
          <View style={[styles.info]}>
            <Text style={[styles.name]}>James</Text>
            <LabelTag />
            <Text style={[styles.date]}>26 Dec 2020</Text>
            <View style={[styles.star]}>
              <Icon name='star-outline' size={10} color={COLORS.grey} />
              <Text style={[styles.celeb]} >Akuffo Addo</Text>
            </View>
          </View>
          </>
        </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 12,
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 22
  },
  img: {
    height: 72,
    width: 72,
    borderRadius: 15
  },
  info: {
    marginLeft: 23,
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  },
  name: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15
  },
  date: {
    fontSize: 10,
    color: COLORS.grey
  },
  celeb: {
    fontSize: 10,
    color: COLORS.grey,
    marginLeft: 5
  },
  star: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
