import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
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
import { useRequests } from '../../hooks/useRequests'
import { initStateRequest } from '../../common/constants'
import HelperService from '../../services/HelperService'
import { requestsActions } from '../../store/requests'

const Request: React.FC = () => {
  const dispatch = useDispatch()
  const [rejecting, setRejecting] = useState(false)
  const { imageUrl: uri, role } = useUser()
  const { navigate, goBack } = useNavigation()
  const { params } = useRoute<RequestScreenRouteProps>()
  const { id } = params
  const {
    occasion,
    status,
    instructions,
    recipient,
    price,
    celebrity: {
      name
    },
    response: {
      duration,
      timestamp
    }
  } = useRequests('id', id)[0] || initStateRequest
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
  const onAccept = () => navigate<Routes>('VideoUpload', { id })
  const onOpenVideo = () => navigate<Routes>('Video', {
    id,
    duration,
    recipient,
    timestamp,
    name
  })
  const onReject = async () => {
    setRejecting(true)
    dispatch(requestsActions.rejectRequest(id, rejectCallback))
  }
  const rejectCallback = () => {
    goBack()
    setRejecting(false)
  }
  return <>
        <ScrollView style={styles.container}>
            <View style={styles.panelContainer}>
                <View style={styles.panel}>
                    <Image
                        source={{ uri }}
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
                                    <TouchableRipple>
                                        <Play/>
                                    </TouchableRipple>
                                </View>
                                <Paragraph black style={styles.videoLabel} >
                                    {occasion}{'\n'}
                                    <Icon name='clock' color='rgba(0,0,0,0.5)' />
                                    <MiniLabel numberOfLines={1} style={styles.duration} >50s</MiniLabel>
                                </Paragraph>
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
            </View>
        </ScrollView>
        {showButtons && <View style={styles.buttons}>
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
    marginLeft: 15
  },
  duration: {
    lineHeight: 25,
    fontSize: 12
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
