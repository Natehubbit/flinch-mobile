import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Divider, TouchableRipple } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { AltMainLabel, MainLabel, maxHeight, Paragraph } from '../../common/styledComponents'
import CelebRequestCard from '../../components/CelebRequestCard'
import Navbar from '../../components/Navbar'
import SectionHeader from '../../components/SectionHeader'
import { COLORS, theme } from '../../config/theme'
import { useLoader } from '../../hooks/useLoader'
import { useUser } from '../../hooks/useUser'
import { Routes } from '../../navigation'
import HelperService from '../../services/HelperService'
import { requestsActions } from '../../store/requests'
import RequestService from '../../services/RequestService'

const STATS = [
  {
    label: 'Pending',
    value: 10,
    type: 'number'
  },
  {
    label: 'Earnings',
    value: 140,
    type: 'cash'
  },
  {
    label: 'Responses',
    value: 25,
    type: 'number'
  }
]

const CelebHome = () => {
  const dispatch = useDispatch()
  const [requests, setRequests] = useState([])
  const [unsubscribe, setUnsubscribe] = useState(null)
  const [responseCount, setResponseCount] = useState(0)
  const noData = requests.length < 1
  const {
    celebrity: {
      id,
      data: {
        imageUrl: uri,
        alias
      }
    }
  } = useUser() || {
    celebrity: {
      data: {
        alias: '',
        imageUrl: ''
      }
    }
  }
  const {
    requestsLoader: {
      isLoading: loading
    }
  } = useLoader()
  useEffect(() => {
    dispatch(requestsActions
      .listenForPending(
        setRequests,
        setUnsubscribe
      )
    )
    RequestService
      .getCelebResponseCount(
        id,
        setResponseCount
      )
    return () => unsubscribe &&
      unsubscribe()
  }, [])
  const { navigate } = useNavigation()
  const onSeeAll = () => {
    navigate<Routes>('Requests')
  }
  const renderStats = () => {
    return STATS.map((d, i) => {
      const isCash = d.label === 'Earnings'
      const isPending = d.label === 'Pending'
      const isResponses = d.label === 'Responses'
      return <View style={[styles.stat]} key={i}>
        <AltMainLabel style={[styles.welcome]}>
          {isCash && 'GHs'}{isPending
            ? requests.length
            : isResponses
              ? responseCount
              : d.value
          }
        </AltMainLabel>
        <AltMainLabel style={[styles.welcome, styles.mini]}>
          {d.label}
        </AltMainLabel>
      </View>
    })
  }

  const renderNoData = () => {
    return (
      <View style={[styles.noData]}>
        <Paragraph black>
          You have no pending requests.
        </Paragraph>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <Navbar invert />
      <ScrollView
        refreshControl={<RefreshControl
          refreshing={loading}
          colors={[theme.colors.primary]}
        />}
      >
        <View
          style={[styles.top]}
        >
          <View style={[styles.content]}>
            <View>
              <AltMainLabel style={[styles.welcome]}>
                Welcome,
              </AltMainLabel>
              <MainLabel style={[styles.name]}>
                {alias}
              </MainLabel>
            </View>
            <View>
              <Image
                source={{ uri }}
                style={[styles.img]}
              />
            </View>
          </View>
          <View style={[styles.stats]}>
            {renderStats()}
          </View>
        </View>
        <View style={[styles.bottom]}>
          <View style={[styles.card]}>
            <View style={[styles.head]} >
              <SectionHeader title='Requests' />
              <TouchableRipple
                rippleColor='rgba(0,163,255,0.2)'
                style={[styles.touch]}
                onPress={onSeeAll}>
                <Paragraph link>
                  See all
                </Paragraph>
              </TouchableRipple>
            </View>
            <Divider/>
            <View style={[styles.cards]}>
              {requests.map(req => (<CelebRequestCard
                ocassion={req.occasion}
                price={HelperService.parseToMoney(req.price)}
                recipient={req.recipient}
                key={req.id}
                time={moment(req.timestamp).fromNow()}
                data={req}
              />))}
            </View>
          </View>
          {noData && renderNoData()}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CelebHome

const styles = StyleSheet.create({
  container: {
  },
  top: {
    height: maxHeight * 0.25,
    backgroundColor: theme.colors.primary
  },
  welcome: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: 'normal',
    lineHeight: 16
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16,
    color: COLORS.white
  },
  img: {
    height: 42,
    width: 42,
    borderRadius: 100
  },
  bottom: {
    paddingHorizontal: 12
  },
  card: {
    elevation: 1,
    backgroundColor: COLORS.white,
    top: -40,
    borderRadius: 10,
    marginBottom: 40,
    overflow: 'hidden'
  },
  stats: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 50,
    position: 'absolute',
    width: '100%'
  },
  stat: {
    alignItems: 'center'
  },
  head: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mini: {
    fontSize: 10
  },
  touch: {
    borderRadius: 100,
    padding: 2
  },
  cards: {
    // bottom: 200
  },
  noData: {
    height: maxHeight * 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
