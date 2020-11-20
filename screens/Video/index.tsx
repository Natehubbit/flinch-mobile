import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FAB } from 'react-native-paper'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import LabelTag from '../../components/LabelTag'
import SectionHeader from '../../components/SectionHeader'
import VideoCardMini from '../../components/VideoCardMini'
import VideoPlayer from '../../components/VideoPlayer'
import { COLORS } from '../../config/theme'
import { useRoute } from '@react-navigation/native'
import { VideoScreenRouteProps } from '../../navigation'

const Video: React.FC = () => {
  const {
    params: {
      // id,
      // duration,
      name,
      recipient,
      timestamp
    }
  } = useRoute<VideoScreenRouteProps>()
  return (
    <View style={[styles.container]}>
      <View style={[styles.videoContainer]}>
        <VideoPlayer/>
      </View>
      <View style={[styles.videoInfo]}>
        <View style={[styles.panel]}>
          <View style={[styles.info]}>
            <Text style={[styles.name]}>{recipient}</Text>
            <LabelTag/>
            <View style={[styles.extraContainer]}>
              <View style={[styles.extra]}>
                <Icon name='calendar' color={COLORS.grey} />
                <Text style={[styles.mini]}>{timestamp}</Text>
              </View>
              <View style={[styles.extra]}>
                <Icon name='star-outline' color={COLORS.grey} />
                <Text style={[styles.mini]}>{name}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.more]}>
            <TouchableOpacity>
              <Icon
                name='dots-vertical'
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={[styles.othersContainer]}
        >
          <SectionHeader title='Others' />
          <View style={[styles.videosContainer]}>
            <VideoCardMini/>
            <VideoCardMini/>
            <VideoCardMini/>
            <VideoCardMini/>
            <VideoCardMini/>
            <VideoCardMini/>
            <VideoCardMini/>
            <VideoCardMini/>
            <VideoCardMini/>
            <VideoCardMini/>
          </View>
        </ScrollView>
      </View>
      <FAB
        icon='share'
        style={[styles.fab]}
      />
    </View>
  )
}

export default Video

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  videoContainer: {
    flex: 1
  },
  videoInfo: {
    flex: 2
  },
  panel: {
    height: 90,
    elevation: 2,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 29,
    paddingVertical: 15
  },
  othersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  videosContainer: {
    marginVertical: 18
  },
  fab: {
    position: 'absolute',
    bottom: 15,
    right: 15
  },
  name: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15
  },
  info: {
    justifyContent: 'space-between'
  },
  more: {
    justifyContent: 'center'
  },
  mini: {
    color: COLORS.grey,
    fontSize: 10,
    marginLeft: 5
  },
  extraContainer: {
    flexDirection: 'row'
  },
  extra: {
    flexDirection: 'row',
    marginRight: 10
  }
})
