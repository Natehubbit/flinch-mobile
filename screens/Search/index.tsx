import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FAB, Searchbar } from 'react-native-paper'

const Search: React.FC = () => {
  const [input, setInput] = useState('')
  const { goBack } = useNavigation()
  const onClose = () => goBack()
  const onSearch = () => {
    console.log('searching ', input)
  }
  return <View style={styles.container}>
        <Searchbar
            value={input}
            onChangeText={setInput}
            onIconPress={onSearch}
            placeholder='Search'
            style={styles.search}
        />
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
  search: {

  }
})

export default Search
