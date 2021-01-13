import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator, HelperText } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import RequestCard from '../../components/RequestCard'
import { theme } from '../../config/theme'
import { useLoader } from '../../hooks/useLoader'
import { useRequests } from '../../hooks/useRequests'
import { Routes } from '../../navigation'
import HelperService from '../../services/HelperService'
import { requestsActions } from '../../store/requests'
import { Request } from '../../types'

const Requests: React.FC = () => {
  const { name } = useRoute()
  const key = name === 'Pending'
    ? 'pending'
    : name === 'Reviewed'
      ? 'success'
      : ''
  const requests = useRequests('status', key)
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const [refresh, setRefresh] = useState(false)
  const {
    requestsLoader: {
      isLoading: loading
    }
  } = useLoader()
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = () => {
    dispatch(requestsActions.getAllRequests())
  }
  const onReload = () => {
    setRefresh(true)
    const endRefresh = () => setRefresh(false)
    dispatch(requestsActions.reloadRequests(endRefresh))
  }
  const onOpenRequest = (id:string, data?:Request) => navigate<Routes>(
    'Request', { id, data }
  )
  const renderRequests = () => {
    const requestEmpty = requests.length < 1
    return requestEmpty
      ? <ScrollView
          contentContainerStyle={[styles.noData]}
          refreshControl={<RefreshControl
            refreshing={refresh}
            onRefresh={onReload}
            colors={[theme.colors.primary]}
        />}
        >
          <HelperText type='info'>
            No {key} requests....pull down to refresh.
          </HelperText>
        </ScrollView>
      : <FlatList
            data={requests}
            contentContainerStyle={[styles.listContainer]}
            renderItem={({ item }) => <RequestCard
                celeb={item.celebrity.name}
                date={HelperService.parseToDate(item.timestamp)}
                occasion={item.occasion}
                imageUrl={item.celebrity.imageUrl}
                price={HelperService.parseToMoney(item.price)}
                tag={item.status}
                recipient={item.recipient}
                onPress={() => onOpenRequest(item.id, item)}
            />}
            refreshControl={<RefreshControl
              refreshing={refresh}
              onRefresh={onReload}
              colors={[theme.colors.primary]}
            />}
            // initialNumToRender={7}
            keyExtractor={(item, i) => item.id || i.toString()}
        />
  }

  return loading
    ? <View style={[styles.loader]}>
        <ActivityIndicator
            animating
            size='small'
        />
    </View>
    : <>
        {renderRequests()}
    </>
}

export default Requests

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    paddingBottom: 25
  }
})
