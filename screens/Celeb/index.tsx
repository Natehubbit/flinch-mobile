import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import { MainLabel, AltMainLabel, MiniLabel, maxHeight, maxWidth, Paragraph } from '../../common/styledComponents'
import { CelebScreenRouteProp, Routes } from '../../navigation'
import HelperService from '../../services/HelperService'
import { Celeb } from '../../types'

const CelebScreen: React.FC = () => {
  const { navigate } = useNavigation()
  const { params } = useRoute<CelebScreenRouteProp>()
  const { data } = params
  const {
    id,
    alias,
    bio,
    craft,
    imageUrl,
    price
  } = data
  const onBook = () => navigate<Routes>(
    'Book',
    {
      data: {
        id,
        price,
        alias,
        imageUrl
      } as Partial<Celeb>
    }
  )
  console.log(price)
  return <View
      style={styles.container}
    >
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.image}
          blurRadius={100}
        >
          <Image
            source={{
              uri: imageUrl
            }}
            style={[styles.img]}
            resizeMode='contain'
          />
        </ImageBackground>
        <View style={styles.dets}>
            <FAB
                uppercase={false}
                icon='wallet'
                style={styles.fab}
                label='Book'
                onPress={onBook}
            />
            <View style={styles.label}>
                <MainLabel>{alias}</MainLabel>
                <MiniLabel>{craft}</MiniLabel>
            </View>
            <View style={styles.bio}>
                <Paragraph black >{bio}</Paragraph>
            </View>
            <View style={styles.price}>
                <AltMainLabel style={styles.price}>
                  {HelperService.parseToMoney(price)}
                </AltMainLabel>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: maxHeight * 0.45,
    width: maxWidth
  },
  fab: {
    position: 'absolute',
    top: -25,
    right: 12
  },
  label: {
    flex: 1
  },
  bio: {
    flex: 2
    // alignItems:'center'
  },
  dets: {
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 12,
    flex: 1
  },
  price: {

  },
  img: {
    flex: 1,
    width: undefined,
    height: undefined
  }
})

export default CelebScreen
