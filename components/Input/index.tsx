import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput, withTheme } from 'react-native-paper'
import { theme } from '../../config/theme'
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput'

interface InputProps extends TextInputProps {
  onIconClicked?:()=>void;
}

const AuthInput: React.FC<InputProps> = ({
  left,
  right,
  onIconClicked,
  style,
  ...props
}) => <TextInput
  {...props}
  mode='flat'
  style={[styles.input, style]}
  right={(right && <TextInput.Icon onPress={onIconClicked} color='#707577' name={right.toString()} />) || null}
  left={
    typeof left === 'string'
      ? <TextInput.Icon color='#707577' name={left.toString()} />
      : left
} />

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    height: 54,
    backgroundColor: '#D5EEFA',
    borderBottomColor: theme.colors.accent
  }
})

export default withTheme(AuthInput)
