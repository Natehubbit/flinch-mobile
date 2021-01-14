// import liraries
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { Paragraph } from '../../common/styledComponents'
import { theme } from '../../config/theme'

interface ButtonActionProps {
  label: string
  icon: string
  onPress?: () => void
}

const ButtonAction: React.FC<ButtonActionProps> = (
  props
) => {
  const { label, icon, onPress } = props
  const { primary } = theme.colors
  return (
    <View style={styles.container}>
      <TouchableRipple
        style={styles.touch}
        onPress={onPress}>
        <>
          <Icon
            name={icon}
            color={primary}
            size={35}
          />
          <Paragraph black>{label}</Paragraph>
        </>
      </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 105,
    minWidth: 131,
    justifyContent: 'center',
    backgroundColor: '#F6FCFF',
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 2
  },
  touch: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {}
})

// make this component available to the app
export default ButtonAction
