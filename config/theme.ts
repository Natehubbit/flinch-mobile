import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { DefaultTheme } from 'react-native-paper'

export const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00A3FF',
    accent: '#00A3FF'
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'Karla-Regular'
    }
  }
}

export const COLORS = {
  white: '#fff',
  red: '#cc0e74',
  warn: '#ff9966',
  lightPrimary: '#D5EEFA',
  success: '#3ACC6C',
  border: 'rgba(0,0,0,0.1)',
  dark: '#000',
  grey: '#808080',
  iconGrey: '#707577',
  light: 'rgba(0,0,0,0.5)',
  light2: 'rgba(0,0,0,0.2)',
  lighter: 'rgba(226,226,226,0.5)'
}

export const settings = {}
