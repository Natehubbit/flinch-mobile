import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as Btn } from 'react-native-paper'
import { theme } from '../../config/theme'

interface ButtonComponentProps {
    label:string;
    type?:'outline';
    loading?:boolean;
    disabled?:boolean;
    onPress?:()=>void;
}

const Button:React.FC<ButtonComponentProps> = ({
  label,
  type,
  onPress,
  loading,
  disabled
}) => {
  const { primary } = theme.colors
  const { text, back, border } = type === 'outline'
    ? { text: primary, back: '#fff', border: 2 }
    : { text: '#fff', back: primary, border: 0 }
  return (
        <Btn
            onPress={onPress}
            style={[styles.container, { borderWidth: border }]}
            color={back}
            labelStyle={{ color: text }}
            mode='contained'
            theme={{ roundness: 100 }}
            loading={loading}
            disabled={disabled}
            uppercase={false}
        >
          {label}
        </Btn>
  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    width: 0,
    minWidth: 150,
    borderWidth: 2,
    borderColor: theme.colors.primary
  }
})

// make this component available to the app
export default Button
