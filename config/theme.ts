import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { DefaultTheme } from 'react-native-paper'

export const theme:Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00A3FF',
    accent: '#00A3FF'
  }
}

export const COLORS = {
  white: '#fff',
  red: '#cc0e74',
  warn: '#ff9966',
  success: '#3ACC6C',
  dark: '#000',
  grey: '#808080',
  light: 'rgba(0,0,0,0.5)'
}

export const settings = {

}
