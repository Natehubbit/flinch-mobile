import React from 'react'
import {
  View,
  StyleSheet,
  ImageBackground
} from 'react-native'
import {
  AltMiniLabel,
  maxHeight,
  Paragraph
} from '../../common/styledComponents'
import { COLORS } from '../../config/theme'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  Routes,
  VideoNavParam
} from '../../navigation'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
interface VideoCardProps {
  id: string
  celebrity: string
  recipient: string
  date: string
  thumbnailUri?: string
  duration: number
  uri: string
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  celebrity,
  date,
  recipient,
  thumbnailUri,
  duration,
  uri
}) => {
  const { navigate } = useNavigation()
  const onOpen = () => {
    const params: VideoNavParam = {
      duration,
      id,
      name: celebrity,
      recipient,
      date,
      uri
    }
    navigate<Routes>('Video', params)
  }
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[styles.touch]}
        onPress={onOpen}>
        <LinearGradient
          colors={[
            'transparent',
            'rgba(0,0,0,0.6)'
          ]}
          style={[styles.content]}>
          <ImageBackground
            source={{ uri: thumbnailUri }}
            style={[styles.img]}
          />
          <View style={[styles.infoContainer]}>
            <View style={[styles.info]}>
              <AltMiniLabel
                numberOfLines={3}
                style={[styles.celeb]}>
                {celebrity}
              </AltMiniLabel>
              <View
                style={[styles.labelContainer]}>
                <View style={[styles.label]}>
                  <Icon
                    size={10}
                    name="account-outline"
                    color={COLORS.white}
                  />
                  <Paragraph
                    style={[styles.mini]}
                    numberOfLines={1}>
                    {recipient}
                  </Paragraph>
                </View>
                <View style={[styles.label]}>
                  <Icon
                    size={10}
                    name="calendar-outline"
                    color={COLORS.white}
                  />
                  <Paragraph
                    style={[styles.mini]}
                    numberOfLines={1}>
                    {date}
                  </Paragraph>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default VideoCard

const styles = StyleSheet.create({
  container: {
    height: maxHeight * 0.3,
    backgroundColor: COLORS.white,
    width: '50%',
    borderWidth: 1,
    borderColor: COLORS.white
  },
  touch: {
    height: '100%'
  },
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1
  },
  content: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    right: 15,
    top: -20,
    elevation: 0
  },
  info: {
    paddingLeft: 15,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 5
  },
  infoContainer: {
    flex: 1
  },
  celeb: {
    color: COLORS.white
  },
  icon: {
    marginRight: 2,
    fontSize: 15
  },
  labelContainer: {
    justifyContent: 'space-between'
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center'
    // fontSize: 5
  },
  mini: {
    fontSize: 10,
    marginLeft: 5
  }
})
