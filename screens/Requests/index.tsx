import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import RequestCard from '../../components/RequestCard'
import { Routes } from '../../navigation'

const Requests = () => {
  const { navigate } = useNavigation()
  const onOpenRequest = () => navigate<Routes>('Request')
  return (
        <View>
            <RequestCard
                name='Judas Ainsely'
                occasion='Birthday'
                price='GHs50.00'
                tag='success'
                onPress={onOpenRequest}
            />
        </View>
  )
}

export default Requests
