import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, RefreshControl } from 'react-native'
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

const RequestsPending: React.FC = () => {
  const requests = useRequests('status', 'pending')
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const [refresh, setRefresh] = useState(false)
  const { id } = useUser()
  const { requestsLoader: loading } = useLoader()
  useEffect(() => {
    fetchData()
  }, [])
  // useEffect(() => {
  //   setRefresh(false)
  // }, [requests])
  const fetchData = () => {
    dispatch(requestsActions.getAllRequests(id))
  }
  const onReload = () => {
    setRefresh(true)
    const endRefresh = () => setRefresh(false)
    dispatch(requestsActions.reloadRequests(id, endRefresh))
  }
  const onOpenRequest = (id:string) => navigate<Routes>(
    'Request', { id }
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
                No pending requests
            </HelperText>
        </ScrollView>
      : <FlatList
            data={requests}
            contentContainerStyle={[styles.listContainer]}
            renderItem={({ item }) => <RequestCard
                name={item.recipient}
                occasion={item.occasion}
                imageUrl={item.celebrity.imageUrl}
                price={HelperService.parseToMoney(item.price)}
                tag={item.status}
                onPress={() => onOpenRequest(item.id)}
            />}
            refreshControl={<RefreshControl
                refreshing={refresh}
                onRefresh={onReload}
                colors={[theme.colors.primary]}
            />}
            initialNumToRender={7}
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

export default RequestsPending

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
