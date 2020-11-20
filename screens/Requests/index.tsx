import React from 'react'
import { View } from 'react-native'
import RequestCard from '../../components/RequestCard'
import { useUser } from '../../hooks/useUser'

const Requests = () => {
  const onOpenRequest = () => {}
  const { imageUrl: uri } = useUser()
  return (
        <View>
            <RequestCard
                name='Judas Ainsely'
                occasion='Birthday'
                price='GHs50.00'
                tag='success'
                onPress={onOpenRequest}
                imageUrl={uri}
            />
        </View>
  )
}

export default Requests
