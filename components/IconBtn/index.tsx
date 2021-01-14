import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewProps
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { COLORS } from '../../config/theme'

interface IconBtnProps extends ViewProps {
  icon: string
  onPress?: () => void
}

const IconBtn: React.FC<IconBtnProps> = ({
  icon,
  onPress,
  ...props
}) => {
  return (
    <View {...props}>
      <TouchableOpacity
        style={[styles.container]}
        onPress={onPress && onPress}>
        <Icon
          name={icon}
          size={30}
          color={COLORS.white}
        />
      </TouchableOpacity>
    </View>
  )
}

export default IconBtn

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  }
})
