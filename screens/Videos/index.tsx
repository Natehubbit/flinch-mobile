import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import VideoCard from '../../components/VideoCard'
import { theme } from '../../config/theme'
import { useLoader } from '../../hooks/useLoader'
import { useResponse } from '../../hooks/useResponse'
import { useUser } from '../../hooks/useUser'
import HelperService from '../../services/HelperService'
import { responseActions } from '../../store/response'

export default function Videos () {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false)
  const data = useResponse('approved')
  const dataExists = data.length > 0
  const { id } = useUser()
  const {
    videosResponseLoader: {
      isLoading: loader
    }
  } = useLoader()
  useEffect(() => {
    dataExists
      ? onReload()
      : dispatch(responseActions.getApproved(id))
  }, [])
  const onReload = () => {
    setRefreshing(true)
    const endRefresh = () => setRefreshing(false)
    dispatch(responseActions.reloadApproved(id, endRefresh))
  }
  return (
    <View style={[styles.container]}>
      {loader
        ? <ActivityIndicator/>
        : <FlatList
        data={data}
        refreshControl={<RefreshControl
          onRefresh={onReload}
          refreshing={refreshing}
          colors={[theme.colors.primary]}
        />}
        renderItem={({ item }) => <VideoCard
          uri={item.videoUri}
          duration={0}
          celebrity={item.celebrity}
          date={HelperService.parseToDate(item.timestamp)}
          id={item.id}
          recipient={item.recipient}
          thumbnailUri={item.thumbnailUri}
        />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
