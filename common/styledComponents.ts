import styled from 'styled-components/native'
import { theme } from '../config/theme'
import { Dimensions, TextProps } from 'react-native'

export const maxWidth = Dimensions.get('window').width
export const maxHeight = Dimensions.get('window').height

export const AuthContainer = styled.ScrollView`
    padding-left: 45px;
    padding-right: 45px;
    background-color: rgba(0,0,0,0.5);
    flex:1;
`

export const AuthContainer2 = styled.View`
    padding-left: 45px;
    padding-right: 45px;
    background-color: white;
    flex:1;
`

export const AppContainer = styled.FlatList`
    padding-top: 12px;
    height:100%;
`

export const Paragraph = styled.Text<ParagraphProps>`
    color:${({ black, link }) => black ? '#000' : link ? theme.colors.primary : '#fff'};
    font-weight:${({ link }) => link ? 'bold' : 'normal'};
    font-family: 'Karla-Regular';
`

export const FormContainer = styled.View`
    height:${maxHeight - 24}px
`

export const FlexContainer = styled.View<FlexContainerProps>`
    flex:${(props:FlexContainerProps) => props.flex || 1};
    background:${(props:FlexContainerProps) => props.color || 'transparent'};
    justify-content:${(props:FlexContainerProps) => props.justify || 'flex-start'};
    flex-direction:${(props:FlexContainerProps) => props.direction || 'column'};
    align-items:${(props:FlexContainerProps) => props.align || 'stretch'}
`

export const MainTitle = styled.Text`
    font-size: 25px;
    color: ${theme.colors.accent};
    font-family: 'SuezOne-Regular';
`

export const SubHeading = styled.Text`
    font-size: 15px;
    font-family: 'MontserratAlternates-Bold'
`

export const MainLabel = styled.Text`
    font-size:25px;
    line-height: 33px;
    font-family: 'SuezOne-Regular'
`

export const AltMainLabel = styled.Text`
    font-size:25px;
    line-height: 33px;
    font-weight: bold;
    font-family: 'Rubik-Regular'
`

export const MiniLabel = styled.Text`
    font-size:16px;
    line-height: 19px;
    font-family: 'Karla-Regular';
    color: #746F6F;
`

export const AltMiniLabel = styled.Text`
    font-size:15px;
    font-weight: bold;
    font-family: 'Rubik-SemiBold'
`

interface FlexContainerProps {
    flex?:number;
    color?:string;
    justify?:string;
    direction?:'row'|'column';
    align?:string;
}

interface ParagraphProps extends TextProps {
    black?:boolean;
    link?:boolean;
}
