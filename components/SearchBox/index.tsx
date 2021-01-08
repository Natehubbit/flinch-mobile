import React from 'react'
import { SearchBoxProvided } from 'react-instantsearch-core'
import { connectSearchBox } from 'react-instantsearch-native'
import { StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'

interface SearchBoxProps extends SearchBoxProvided {

}

const SearchBox: React.FC<SearchBoxProps> = ({
  currentRefinement,
  refine
}) => {
  return (
    <Searchbar
      value={currentRefinement}
      onChangeText={refine}
      placeholder='Search'
      style={styles.search}
    />
  )
}

export default connectSearchBox(SearchBox)

const styles = StyleSheet.create({
  search: {

  }
})
