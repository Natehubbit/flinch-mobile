import { DrawerActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar, Badge, withTheme } from 'react-native-paper'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { Theme } from 'react-native-paper/lib/typescript/src/types'

interface NavProps {
    title?:string;
    left?:string;
    right?:string;
    isHome?:boolean;
    hideMenu?:boolean;
    hideBell?:boolean;
    transparent?:boolean;
    theme: Theme;
}

const Navbar: React.FC<NavProps> = ({
  title,
  isHome,
  hideMenu,
  hideBell
}) => {
  const { navigate, canGoBack, dispatch, goBack } = useNavigation()
  const backable = canGoBack()
  const onToggleDrawer = () => dispatch(DrawerActions.toggleDrawer())
  const onSearch = () => navigate('Search')
  const renderIcon = (icon:string, badge?:boolean) => (
        <View style={styles.iconContainer}>
            <Icon
                name={icon}
                style={styles.icon}
                size={24}
            />
            {badge && <Badge size={9} style={styles.badge} visible />}
        </View>
  )

  return <Appbar
        theme={{ colors: { primary: 'white' } }}
        style={styles.container}>
        {backable
          ? <Appbar.BackAction onPress={goBack}/>
          : !hideMenu && <Appbar.Action onPress={onToggleDrawer} icon='menu' />
        }
        <Appbar.Content title={title} titleStyle={styles.title} />
        {isHome && <Appbar.Action
            icon={() => renderIcon('magnify')}
            onPress={onSearch}
            animated={false}
        />}
        {!hideBell && <Appbar.Action animated={false} icon={() => renderIcon('bell-outline', true)} />}
    </Appbar>
}

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    height: 50
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'SuezOne-Regular'
  },
  iconContainer: {

  },
  icon: {
    opacity: 0.5
  },
  badge: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: '#3ACC6C'
  }
})

export default withTheme(Navbar)
