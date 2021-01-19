import React from 'react'
import {
  connectInfiniteHits,
  InfiniteHitsProvided
} from 'react-instantsearch-core'
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native'
import SearchItem from '../SearchItem'
// import Algolia from '../../assets/images/algolia.svg'
import SearchAlgolia from '../../assets/images/searchAlgolia.svg'
import { COLORS } from '../../config/theme'
import { Paragraph } from '../../common/styledComponents'
import { Celebs } from '../../types'

interface SearchHitsProps
  extends Partial<InfiniteHitsProvided> {
  onPress: (data: any) => void
  hits?: Celebs
}

const SearchHits: React.FC<SearchHitsProps> = ({
  hits,
  hasMore,
  refineNext,
  onPress
}) => {
  const renderLogo = () => {
    const hasHits = hits.length > 0
    return (
      <>
        {!hasHits && (
          <View style={[styles.noData]}>
            <Paragraph black>
              No data found
            </Paragraph>
          </View>
        )}
        <View style={[styles.algolia]}>
          <SearchAlgolia />
        </View>
      </>
    )
  }
  return (
    <FlatList
      data={hits}
      keyExtractor={(item) => item.objectID}
      onEndReached={hasMore && refineNext}
      ListFooterComponent={renderLogo()}
      renderItem={({ item }) => (
        <SearchItem
          label={item.alias}
          uri={item.imageUrl}
          onPress={() =>
            onPress({
              ...item,
              id: item.objectID
            })
          }
        />
      )}
    />
  )
}

export default connectInfiniteHits(
  SearchHits
) as React.ComponentClass<SearchHitsProps, any>

const styles = StyleSheet.create({
  algolia: {
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.light2
  },
  noData: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
