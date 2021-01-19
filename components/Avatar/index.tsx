import React from 'react'
import {
  Image,
  StyleSheet,
  View,
  ViewProps
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import { COLORS, theme } from '../../config/theme'

interface AvatarProps extends ViewProps {
  onPress: () => void
  source: string
}

const Avatar: React.FC<AvatarProps> = ({
  onPress,
  source,
  style
}) => {
  const showImage = source.length > 0
  return (
    <TouchableOpacity
      style={[style && style]}
      onPress={onPress}>
      <View style={[styles.container]}>
        {showImage ? (
          <Image
            source={{ uri: source }}
            style={styles.img}
          />
        ) : (
          <Icon
            name="add"
            size={25}
            style={styles.icon}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: COLORS.light2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  icon: {
    color: theme.colors.primary
  },
  img: {
    height: '100%',
    width: '100%'
  }
})

export default Avatar
