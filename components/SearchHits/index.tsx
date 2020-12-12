import React from 'react'
import { connectInfiniteHits, InfiniteHitsProvided } from 'react-instantsearch-core'
import { FlatList } from 'react-native'
import { Celebs } from '../../services/CelebService'
import SearchItem from '../SearchItem'

interface SearchHitsProps extends Partial<InfiniteHitsProvided> {
  onPress:(data:any)=>void;
  hits?: Celebs;
}

const SearchHits: React.FC<SearchHitsProps> = ({
  hits,
  hasMore,
  refineNext,
  onPress
}) => {
  return <FlatList
      data={hits}
      keyExtractor={(item) => item.objectID}
      onEndReached={hasMore && refineNext}
      renderItem={({ item }) => (
        <SearchItem
          label={item.alias}
          uri={item.imageUrl}
          onPress={() => onPress({
            ...item,
            id: item.objectID
          })}
        />
      )}
    />
}

export default (connectInfiniteHits(SearchHits) as React.ComponentClass<SearchHitsProps, any>)
