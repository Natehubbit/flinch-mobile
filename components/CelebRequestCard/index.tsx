import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'
import {
  Divider,
  Paragraph,
  TouchableRipple
} from 'react-native-paper'
import Urgent from '../../assets/images/urgent.svg'
import Wait from '../../assets/images/wait.svg'
import { AltMiniLabel } from '../../common/styledComponents'
import { Routes } from '../../navigation'
import { Request } from '../../types'
import { theme } from '../../config/theme'

interface CelebRequestCardProps {
  ocassion: string
  recipient: string
  price: string
  data: Request
  time: string
}

const CelebRequestCard: React.FC<CelebRequestCardProps> = ({
  ocassion,
  recipient,
  price,
  data,
  time
}) => {
  const { navigate } = useNavigation()
  const expire = moment(data.timestamp)
    .add(7, 'days')
  const expNo = Number(expire.fromNow(true))
  const expireText = expire.fromNow()
  const endsSoon = expNo < 2
  const onPress = () => {
    navigate<Routes>('Request', { id: '', data })
  }
  return (
    <>
      <TouchableRipple
        style={[styles.container]}
        onPress={onPress}>
        <>
          <View style={[styles.icon]}>
            {endsSoon
            ? <Urgent height={40} width={40} />
            : <Wait height={40} width={40} />
            }
          </View>
          <View style={[styles.info]}>
            <AltMiniLabel style={[styles.event]}>
              {ocassion}
            </AltMiniLabel>
            <Paragraph>{recipient}</Paragraph>
          </View>
          <View style={[styles.extra]}>
            <Paragraph
              numberOfLines={1}
              style={[styles.time]}>
              exp. {expireText}
            </Paragraph>
            <Paragraph style={[styles.price]}>
              {price}
            </Paragraph>
          </View>
        </>
      </TouchableRipple>
      <Divider />
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
    justifyContent: 'space-between',
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
    flex: 4
  },
  event: {
    fontSize: 15,
    fontWeight: 'normal'
  },
  time: {
    fontSize: 12
  },
  price: {
    color: theme.colors.primary
  }
})
