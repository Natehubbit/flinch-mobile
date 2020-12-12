import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Divider, TouchableRipple } from 'react-native-paper'
import { AltMainLabel, MainLabel, maxHeight, Paragraph } from '../../common/styledComponents'
import CelebRequestCard from '../../components/CelebRequestCard'
import Navbar from '../../components/Navbar'
import SectionHeader from '../../components/SectionHeader'
import { COLORS, theme } from '../../config/theme'
import { useUser } from '../../hooks/useUser'
import { Routes } from '../../navigation'

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
  const { imageUrl: uri } = useUser()
  const { navigate } = useNavigation()
  const onSeeAll = () => {
    navigate<Routes>('Requests')
  }
  const renderStats = () => {
    return STATS.map((d, i) => {
      const isCash = d.type === 'cash'
      return <View style={[styles.stat]} key={i}>
        <AltMainLabel style={[styles.welcome]}>
          {isCash && 'GHs'}{d.value}
        </AltMainLabel>
        <AltMainLabel style={[styles.welcome, styles.mini]}>
          {d.label}
        </AltMainLabel>
      </View>
    })
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <Navbar invert />
      <ScrollView>
        <View
          style={[styles.top]}
        >
          <View style={[styles.content]}>
            <View>
              <AltMainLabel style={[styles.welcome]}>
                Welcome,
              </AltMainLabel>
              <MainLabel style={[styles.name]}>
                Shatta Wale
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
              <CelebRequestCard/>
              {/* <CelebRequestCard/>
              <CelebRequestCard/>
              <CelebRequestCard/>
              <CelebRequestCard/>
              <CelebRequestCard/>
              <CelebRequestCard/>
              <CelebRequestCard/> */}
            </View>
          </View>
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
  }
})
