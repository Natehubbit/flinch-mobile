import styled from 'styled-components/native'
import { COLORS, theme } from '../config/theme'
import {
  Dimensions,
  TextProps,
  ViewProps
} from 'react-native'

export const maxWidth = Dimensions.get('window')
  .width
export const maxHeight = Dimensions.get('window')
  .height

export const AuthContainer = styled.ScrollView`
  padding-left: 45px;
  padding-right: 45px;
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
`

export const AuthContainer2 = styled.View`
  padding-left: 45px;
  padding-right: 45px;
  background-color: white;
  flex: 1;
`

export const AppContainer = styled.FlatList`
  padding-top: 12px;
  height: 100%;
`

export const Paragraph = styled.Text<ParagraphProps>`
  color: ${({ black, link, light }) =>
    black
      ? '#000'
      : link
      ? theme.colors.primary
      : light
      ? 'rgba(0,0,0,0.5)'
      : '#fff'};
  font-weight: ${({ link }) =>
    link ? 'bold' : 'normal'};
  font-family: 'Karla-Regular';
`

export const FormContainer = styled.View<ViewProps>`
  height: ${maxHeight - 24}px;
`

export const FlexContainer = styled.View<FlexContainerProps>`
  flex: ${(props) => props.flex || 1};
  background: ${(props) =>
    props.color || 'transparent'};
  justify-content: ${(props) =>
    props.justify || 'flex-start'};
  flex-direction: ${(props) =>
    props.direction || 'column'};
  align-items: ${(props) =>
    props.align || 'stretch'};
`

export const MainTitle = styled.Text<TextProps>`
  font-size: 25px;
  color: ${theme.colors.accent};
  font-family: 'SuezOne-Regular';
`

export const SubHeading = styled.Text<SubHeadingProps>`
  font-size: 15px;
  font-family: 'MontserratAlternates-Bold';
  color: ${(props) =>
    props.white ? COLORS.white : COLORS.dark};
`

export const MainLabel = styled.Text<MainLabelProps>`
    font-size:25px;
    color:${(props) =>
      props.white ? COLORS.white : COLORS.dark}
    line-height: 33px;
    font-family: 'SuezOne-Regular'
`

export const AltMainLabel = styled.Text<TextProps>`
  font-size: 25px;
  line-height: 33px;
  font-weight: bold;
  font-family: 'Rubik-Regular';
`

export const MiniLabel = styled.Text`
  font-size: 16px;
  line-height: 19px;
  font-family: 'Karla-Regular';
  color: #746f6f;
`

export const AltMiniLabel = styled.Text`
  font-size: 15px;
  font-weight: bold;
  font-family: 'Rubik-SemiBold';
`

interface FlexContainerProps extends ViewProps {
  flex?: number
  color?: string
  justify?: string
  direction?: 'row' | 'column'
  align?: string
}

interface MainLabelProps extends TextProps {
  white?: boolean
}

interface SubHeadingProps extends TextProps {
  white?: boolean
}

interface ParagraphProps extends TextProps {
  black?: boolean
  link?: boolean
  light?: boolean
}
