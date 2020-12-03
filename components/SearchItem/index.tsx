import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Paragraph, TouchableRipple } from 'react-native-paper'

const img = require('../../assets/images/celeb.jpg')

interface SearchItemProps {
  uri:string;
  label:string;
}

const SearchItem: React.FC<SearchItemProps> = ({
  uri
}) => {
  return (
    <View>
      <TouchableRipple
        onPress={() => console.log('bb')}
        style={[styles.container]}
      >
        <>
      <Image
        source={img}
        style={[styles.img]}
      />
      <View
        style={[styles.label]}
      >
        <Paragraph>
          James Hello
        </Paragraph>
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
