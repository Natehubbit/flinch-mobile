import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-core'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import SearchBox from '../../components/SearchBox'
import SearchHits from '../../components/SearchHits'
import { Routes } from '../../navigation'
import SearchService from '../../services/SearchService'

const Search: React.FC = () => {
  const { goBack, navigate } = useNavigation()
  const onClose = () => goBack()
  const onPress = (data:any) => {
    navigate<Routes>('Celeb', { data })
  }
  return <View style={styles.container}>
    <InstantSearch
      searchClient={SearchService.searchClient}
      indexName="celebs"
    >
      <SearchBox/>
      <SearchHits
        onPress={onPress}
      />
    </InstantSearch>
    <FAB
      icon='close'
      style={styles.fab}
      onPress={onClose}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    bottom: 12,
    right: 12
  },
  content: {
    // paddingHorizontal: 17
  },
  search: {

  }
})

export default Search
