import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import VideoPlayer from '../../components/VideoPlayer'
import { COLORS } from '../../config/theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import { VideoScreenRouteProps } from '../../navigation'
import { LinearGradient } from 'expo-linear-gradient'
import HelperService from '../../services/HelperService'
import { useUser } from '../../hooks/useUser'
import { VIDEO_SAVES } from '../../common/constants'
import DownloadHookService from '../../services/DownloadHookService'

const Video: React.FC = () => {
  const [saving, setSaving] = useState(false)
  const [progress, setProgress] = useState(0)
  const { displayName } = useUser()
  const { goBack } = useNavigation()
  const {
    params: {
      name,
      uri: url
    }
  } = useRoute<VideoScreenRouteProps>()
  const onShare = () => {
    HelperService.shareMedia(
      `${displayName} sent you a FLINCH from ${name} at ${url}`
    )
  }
  const onSaveVideo = async () => {
    setSaving(true)
    const label = Date.now() + '.mp4'
    const uri = await DownloadHookService
      .download(url, `${label}.mp4`, setProgress)
    uri && await HelperService
      .saveMedia(VIDEO_SAVES, uri)
    setSaving(false)
  }
  return (
    <View style={[styles.container]}>
      <View style={[styles.head]}>
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent']}
          style={[styles.headContent]}
        >
          <FAB
            icon='close'
            style={[styles.icon]}
            small
            onPress={goBack}
          />
        </LinearGradient>
      </View>
      <View style={[styles.videoContainer]}>
        <VideoPlayer
          uri={url}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)']}
          style={[styles.btnsContainer]}
        >
          <View style={[styles.btns]}>
            {!saving
              ? <FAB
                icon='cloud-download'
                onPress={onSaveVideo}
                label='Download'
                theme={{ colors: { accent: 'transparent' } }}
                uppercase={false}
                style={[styles.download]}
              />
              : <FAB
                icon={null}
                loading={saving}
                label={`${progress}% Downloading`}
                uppercase={false}
                small
                style={[styles.download]}
              />
            }
            {/* <IconBtn
              icon='cloud-download-outline'
            /> */}
          </View>
          <View style={[styles.aside]}>
            {/* <IconBtn
              icon='export-variant'
              onPress={onShare}
              style={[styles.btn]}
            /> */}
            <FAB
              icon='send'
              onPress={onShare}
              small
              style={[styles.send]}
            />
          </View>
        </LinearGradient>
      </View>
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
  icon: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    elevation: 0,
    left: 15
  },
  aside: {
    alignItems: 'center'
  },
  head: {
    height: 60,
    zIndex: 1,
    width: '100%',
    position: 'absolute'
  },
  headContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center'
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  btnsContainer: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    paddingBottom: 2,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  btn: {
    marginBottom: 15
  },
  btnLeft: {
    marginRight: 15
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
  },
  send: {
    bottom: 15
  },
  download: {
    backgroundColor: 'transparent',
    elevation: 0,
    bottom: 10
  }
})
