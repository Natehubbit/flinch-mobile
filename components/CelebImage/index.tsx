import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import { maxHeight, maxWidth } from '../../common/styledComponents'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../../config/theme'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../../navigation'
import { Celeb } from '../../types'

interface CelebImageProps extends Celeb {
    large?:boolean;
}
const CelebImage: React.FC<CelebImageProps> = ({
  large,
  ...props
}) => {
  const {
    alias,
    price,
    craft,
    imageUrl
  } = props
  const size = large ? { width: '47%' } : null
  const {
    navigate
  } = useNavigation()
  const onPressed = () => navigate<Routes>('Celeb', { data: { ...props, price: (price as any).amount } })
  return <Card
        theme={{ roundness: 10 }}
        onPress={onPressed}
        style={[styles.container, size]}
    >
        <Card.Cover
            style={[styles.cover]}
            theme={{ roundness: 10 }}
            source={{
              uri: imageUrl
            }}
        />
        <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.overlay}
        >
            <View style={styles.textContainer}>
                <View style={styles.dets}>
                    <Text numberOfLines={1} style={styles.celebName}>{alias}</Text>
                    <Text style={styles.role}>{craft}</Text>
                </View>
                <Text style={styles.price}>GHs{(price as any).amount}</Text>
            </View>
        </LinearGradient>
    </Card>
}

const styles = StyleSheet.create({
  container: {
    width: maxWidth * 0.35,
    marginRight: 10,
    height: maxHeight * 0.20,
    marginBottom: 20
  },
  cover: {
    height: maxHeight * 0.20,
    borderRadius: 10
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    justifyContent: 'flex-end',
    padding: 5
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  celebName: {
    color: 'white',
    fontFamily: 'Rubik-SemiBold',
    fontSize: 12
  },
  role: {
    color: 'white',
    fontFamily: 'Karla-Regular',
    fontSize: 11
  },
  price: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.primary
  },
  dets: {
    width: '75%',
    paddingRight: 5
  }
})

export default CelebImage
