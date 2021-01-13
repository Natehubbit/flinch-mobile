import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { Divider, TouchableRipple } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { MiniLabel, SubHeading, Paragraph } from '../../common/styledComponents'
import { useUser } from '../../hooks/useUser'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import Play from '../../assets/images/play.svg'
import Tag from '../../components/Tag'
import Button from '../../components/Button'
import { Routes, RequestScreenRouteProps } from '../../navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
// import { useRequests } from '../../hooks/useRequests'
// import { initStateRequest } from '../../common/constants'
import HelperService from '../../services/HelperService'
import { requestsActions } from '../../store/requests'
import Navbar from '../../components/Navbar'
import RequestService from '../../services/RequestService'
import { initStateRequest } from '../../common/constants'

const Request: React.FC = () => {
  const dispatch = useDispatch()
  const [rejecting, setRejecting] = useState(false)
  const { role } = useUser()
  const [loading, setLoading] = useState(false)
  const { navigate, goBack } = useNavigation()
  const [request, setRequest] = useState(null)
  const { params, name: route } = useRoute<RequestScreenRouteProps>()
  const { id, data } = params
  const {
    occasion,
    status,
    instructions,
    recipient,
    price,
    celebrity: {
      name,
      imageUrl
    },
    response: {
      duration,
      timestamp,
      videoUri: uri,
      thumbnailUri
    }
  } = request ||
  data ||
  initStateRequest

  const summarize = instructions.length > 99
  const info = summarize
    ? instructions.substring(0, 99)
    : instructions
  const summarizeText = summarize
    ? 'see more'
    : 'see less'
  const isUser = role === 'user'
  const isSuccess = status === 'success'
  const isPending = status === 'pending'
  const showButtons = !isUser && isPending
  useEffect(() => {
    const init = async () => {
      await fetchData()
    }
    init()
  }, [])
  const fetchData = async () => {
    setLoading(true)
    const request = await RequestService
      .getRequest(id)
    setRequest(request)
    setLoading(false)
  }
  const onAccept = () => navigate<Routes>('VideoUpload', { id: id || data?.id })
  const onOpenVideo = () => navigate<Routes>('Video', {
    id: id || data?.id,
    duration,
    recipient,
    date: HelperService.parseToDate(timestamp),
    name,
    uri
  })
  const onReject = async () => {
    setRejecting(true)
    dispatch(requestsActions.rejectRequest(id || data?.id, rejectCallback))
  }
  const rejectCallback = () => {
    goBack()
    setRejecting(false)
  }
  return <>
    <Navbar hideBell title={route} />
        <ScrollView
          style={styles.container}
          refreshControl={<RefreshControl
            refreshing={loading}
            onRefresh={fetchData}
          />}>
            {!loading && <View style={styles.panelContainer}>
                <View style={styles.panel}>
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.img}
                    />
                    <View style={styles.panelContent}>
                        <View style={styles.userInfo}>
                            <MiniLabel numberOfLines={1} style={styles.name}>
                                {name}
                            </MiniLabel>
                            <View>
                                <Tag label={status}/>
                            </View>
                        </View>
                        <Divider/>
                        <View style={styles.details}>
                            <SubHeading style={styles.miniHead}>Instructions</SubHeading>
                            <Paragraph black>
                                {info}
                                {summarize && <Paragraph link >
                                    {summarizeText}
                                </Paragraph>}
                            </Paragraph>
                        </View>
                        {isSuccess && <>
                            <Divider style={[styles.div]}/>
                            <TouchableRipple
                                onPress={onOpenVideo}
                                style={{ flex: 1 }}
                            >
                            <View style={styles.videoContainer}>
                                <View style={styles.video}>
                                  <ImageBackground
                                    source={{ uri: thumbnailUri }}
                                    style={[styles.thumbnail]}
                                  />
                                  <Play/>
                                </View>
                                <View style={styles.videoLabel}>
                                  <Paragraph black>
                                    {occasion}
                                  </Paragraph>
                                  <View style={[styles.length]}>
                                    <Icon name='clock-outline' color='rgba(0,0,0,0.5)' />
                                    <MiniLabel numberOfLines={1} style={styles.duration} >
                                      {Math.ceil(duration)}s
                                    </MiniLabel>
                                  </View>
                                </View>
                            </View>
                            </TouchableRipple>
                        </>}
                        <Divider style={[styles.div]}/>
                        <View style={styles.bottom}>
                            <View style={styles.bottomLabel}>
                                <Icon name='account' color='rgba(0,0,0,0.5)' />
                                <MiniLabel numberOfLines={1} style={styles.bottomText}>
                                    {recipient}
                                </MiniLabel>
                            </View>
                            <View style={styles.bottomLabel}>
                                <Icon name='wallet' color='rgba(0,0,0,0.5)' />
                                <MiniLabel numberOfLines={1} style={styles.bottomText}>
                                    {HelperService.parseToMoney(price)}
                                </MiniLabel>
                            </View>
                        </View>
                    </View>
                </View>
            </View>}
        </ScrollView>
        {showButtons && !loading && <View style={styles.buttons}>
            <Button
              onPress={onAccept}
              label='Accept'
              disabled={rejecting}
            />
            <Button
              onPress={onReject}
              label='Reject'
              type='outline'
              loading={rejecting}
              disabled={rejecting}
            />
        </View>}
    </>
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  panelContainer: {
    paddingTop: 100,
    paddingHorizontal: 35
  },
  panel: {
    borderRadius: 15,
    paddingVertical: 25,
    elevation: 2,
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  panelContent: {
    marginTop: 25
  },
  img: {
    height: 86,
    width: 86,
    borderRadius: 100,
    position: 'absolute',
    top: -45,
    alignSelf: 'center'
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
    width: '70%',
    alignSelf: 'center',
    flexDirection: 'column'
  },
  thumbnail: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  name: {
    fontSize: 15,
    marginVertical: 5
  },
  details: {
    paddingTop: 11,
    paddingBottom: 19,
    paddingHorizontal: 9
  },
  miniHead: {
    fontSize: 12,
    marginBottom: 10
  },
  see: {
    margin: 0
  },
  seeLabel: {
    fontSize: 10,
    textTransform: 'none',
    marginVertical: 0,
    marginHorizontal: 0
  },
  videoContainer: {
    padding: 9,
    flexDirection: 'row',
    alignItems: 'center'
  },
  video: {
    height: 60,
    backgroundColor: '#000',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoLabel: {
    marginLeft: 15,
    alignItems: 'flex-start'
  },
  length: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  duration: {
    lineHeight: 25,
    fontSize: 12,
    marginLeft: 2
  },
  durationIcon: {
    opacity: 0.5
  },
  bottom: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  bottomLabel: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomText: {
    fontSize: 15
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 11,
    paddingHorizontal: 25
  },
  div: {
    height: 1
  }
})

export default Request
