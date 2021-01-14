import React from 'react'
import {
  Image,
  StyleSheet,
  View
} from 'react-native'
import {
  Paragraph,
  TouchableRipple
} from 'react-native-paper'
interface SearchItemProps {
  uri: string
  label: string
  onPress: () => void
}

const SearchItem: React.FC<SearchItemProps> = ({
  uri,
  label,
  onPress
}) => {
  return (
    <View>
      <TouchableRipple
        onPress={onPress}
        style={[styles.container]}>
        <>
          <Image
            source={{ uri }}
            style={[styles.img]}
          />
          <View style={[styles.label]}>
            <Paragraph>{label}</Paragraph>
          </View>
        </>
      </TouchableRipple>
    </View>
  )
}

export default SearchItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 17
  },
  img: {
    height: 39,
    width: 39,
    borderRadius: 100
  },
  label: {
    justifyContent: 'center',
    marginLeft: 17
  }
})
