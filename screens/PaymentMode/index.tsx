import React from 'react'
import {
  Alert,
  StyleSheet,
  View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import {
  PAYMENT_CALLBACK,
  PAYMENT_OPTIONS
} from '../../common/constants'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import PaymentService from '../../services/PaymentService'
import { useUser } from '../../hooks/useUser'
import { loaderActions } from '../../store/loader'
import { useDispatch } from 'react-redux'
import { PaymentType } from '../../types'
import { useRequest } from '../../hooks/useRequest'
import {
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { Routes } from '../../navigation'
import { COLORS } from '../../config/theme'

const PaymentMode: React.FC = () => {
  const dispatch = useDispatch()
  const request = useRequest()
  const { params } = useRoute()
  const { navigate } = useNavigation()
  const cost = request.price.amount.toString()
  const { currency } = request.price
  const {
    id,
    displayName,
    email,
    token
  } = useUser()
  const onSelect = async (type: string) => {
    dispatch(
      loaderActions.loading('paymentLoader')
    )
    const isCreditCard = type === 'Credit Card'
    let uri = ''
    if (isCreditCard) {
      uri = await makePayment('card', cost)
    } else {
      uri = await makePayment(
        'mobile_money',
        cost
      )
    }
    uri
      ? navigate<Routes>('Payment', {
          uri
        })
      : Alert.alert(
          'Error',
          'Failed to launch Payment Widget'
        )
    stopLoading()
  }
  const stopLoading = () => {
    dispatch(
      loaderActions.loaded('paymentLoader')
    )
  }
  const makePayment = async (
    mode: PaymentType,
    amount: string
  ) => {
    const payload = {
      amount,
      callback_url: PAYMENT_CALLBACK,
      channels: [mode],
      currency,
      email,
      label: displayName,
      metadata: {
        customerName: displayName,
        requestId: request.id,
        id,
        data: request,
        token,
        celebToken:
          (params as any)?.data?.token || ''
      }
    }
    const data = await PaymentService.init(
      payload
    )
    if (!data) return null
    const { authorization_url: url } = data
    return url
  }
  const renderIcon = (icon: string) => {
    return (
      <View style={styles.logoContainer}>
        <Icon name={icon} size={25} />
      </View>
    )
  }
  const renderOptions = () => {
    return PAYMENT_OPTIONS.map(
      ({ label, icon }) => (
        <List.Item
          key={label}
          onPress={() => onSelect(label)}
          title={label}
          left={() => renderIcon(icon)}
          style={styles.listItem}
        />
      )
    )
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {renderOptions()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1
  },
  scroll: {
    // paddingTop:10,
  },
  listItem: {
    elevation: 1.5,
    marginVertical: 7,
    backgroundColor: '#fff',
    height: 54,
    marginHorizontal: 12
  },
  logo: {
    height: 33,
    width: 33
  },
  logoContainer: {
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5
  }
})

export default PaymentMode
