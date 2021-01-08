import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Paragraph, TouchableRipple } from 'react-native-paper'
import Urgent from '../../assets/images/urgent.svg'
import { AltMiniLabel } from '../../common/styledComponents'

const CelebRequestCard = () => {
  return (
    <>
    <TouchableRipple style={[styles.container]}>
      <>
        <View style={[styles.icon]}>
          <Urgent height={40} width={40} />
        </View>
        <View style={[styles.info]}>
          <AltMiniLabel style={[styles.event]}>
            Advice
          </AltMiniLabel>
          <Paragraph>
            Jennifer
          </Paragraph>
        </View>
        <View style={[styles.extra]}>
          <Paragraph numberOfLines={1} style={[styles.time]}>
            3 days to go
          </Paragraph>
          <AltMiniLabel>
            GHs50.00
          </AltMiniLabel>
        </View>
      </>
    </TouchableRipple>
    <Divider/>
    </>
  )
}

export default CelebRequestCard

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 2
  },
  info: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    flex: 6,
    height: '100%'
  },
  col1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  extra: {
    alignItems: 'flex-end',
    height: '100%',
    // backgroundColor: 'red',
    flex: 4
  },
  event: {
    fontSize: 15,
    fontWeight: 'normal'
  },
  time: {
    fontSize: 12
  }
})
