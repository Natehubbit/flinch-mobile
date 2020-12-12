import { DrawerActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar, Badge, TouchableRipple, withTheme } from 'react-native-paper'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { COLORS } from '../../config/theme'
import MenuIcon from '../../assets/images/menu.svg'
import { Routes } from '../../navigation'

interface NavProps {
    title?:string;
    left?:string;
    right?:string;
    isHome?:boolean;
    hideMenu?:boolean;
    hideBell?:boolean;
    transparent?:boolean;
    edit?:boolean;
    showCancel?:boolean;
    theme: Theme;
    onCancel?:()=>void;
    onEdit?:()=>void;
}

const Navbar: React.FC<NavProps> = ({
  title,
  isHome,
  hideMenu,
  hideBell,
  edit,
  showCancel,
  onCancel,
  onEdit
}) => {
  const {
    navigate,
    canGoBack,
    dispatch,
    goBack
  } = useNavigation()
  const backable = canGoBack()
  const onToggleDrawer = () =>
    dispatch(DrawerActions.toggleDrawer())
  const onSearch = () =>
    navigate<Routes>('Search')
  const renderIcon = (icon:string, badge?:boolean) => (
        <View style={styles.iconContainer}>
            <Icon
                name={icon}
                style={styles.icon}
                size={24}
            />
            {badge && <Badge
              size={9}
              style={styles.badge}
              visible
            />}
        </View>
  )
  const openNotifs = () =>
    navigate<Routes>('Notifications')

  return <Appbar
        theme={{ colors: { primary: COLORS.white } }}
        style={styles.container}>
        {backable
          ? <Appbar.BackAction onPress={goBack}/>
          : !hideMenu &&
            <TouchableRipple onPress={onToggleDrawer}>
              <MenuIcon width={35} height={30}/>
            </TouchableRipple>
        }
        <Appbar.Content
          title={title}
          titleStyle={styles.title}
        />
        {isHome && <Appbar.Action
            icon={() => renderIcon('magnify')}
            onPress={onSearch}
            animated={false}
        />}
        {!hideBell
          ? <Appbar.Action
            animated={false}
            icon={() => renderIcon('bell-outline', true)}
            onPress={openNotifs}
          />
          : !edit && <Appbar.Action
            animated={false}
            icon={() => null}
            disabled
          />}
          {edit && !showCancel &&
          <Appbar.Action
            icon={() => renderIcon('account-edit')}
            onPress={onEdit}
          />}
          {edit && showCancel &&
          <Appbar.Action
            icon={() => renderIcon('close')}
            onPress={onCancel}
          />}
    </Appbar>
}

const styles = StyleSheet.create({
  container: {
    elevation: 1,
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
