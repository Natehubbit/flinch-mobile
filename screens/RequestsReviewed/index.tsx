import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator, HelperText } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import RequestCard from '../../components/RequestCard'
import { theme } from '../../config/theme'
import { useLoader } from '../../hooks/useLoader'
import { useRequests } from '../../hooks/useRequests'
import { useUser } from '../../hooks/useUser'
import { Routes } from '../../navigation'
import HelperService from '../../services/HelperService'
import { requestsActions } from '../../store/requests'

const RequestsReviewed: React.FC = () => {
  const requests = useRequests('status', 'success')
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const { id } = useUser()
  const { requestsLoader: loading } = useLoader()
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = () => {
    dispatch(requestsActions.getAllRequests(id))
  }
  const onReload = () => {
    console.log('hel')
    setRefreshing(true)
    const endRefresh = () => setRefreshing(false)
    dispatch(requestsActions.reloadRequests(id, endRefresh))
  }
  const onOpenRequest = (id:string) => navigate<Routes>(
    'Request', { id }
  )

  const renderRequests = () => {
    const requestEmpty = requests.length < 1
    return (
      requestEmpty
        ? <ScrollView
          contentContainerStyle={[styles.noData]}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onReload}
            colors={[theme.colors.primary]}
          />}
        >
          <HelperText type='info'>
            No reviewed requests
          </HelperText>
        </ScrollView>
        : <FlatList
          data={requests}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onReload}
            colors={[theme.colors.primary]}
          />}
          renderItem={({ item }) => <RequestCard
            name={item.recipient}
            imageUrl={item.celebrity.imageUrl}
            occasion={item.occasion}
            price={HelperService.parseToMoney(item.price)}
            tag={item.status}
            onPress={() => onOpenRequest(item.id)}
          />}
          keyExtractor={(item, i) => item.id || i.toString()}
        />
    )
  }

  return loading
    ? <View style={[styles.loader]}>
        <ActivityIndicator
            animating
            size='small'
        />
    </View>
    : <View style={[styles.container]}>
        {renderRequests()}
    </View>
}

export default RequestsReviewed

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10
  },
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
