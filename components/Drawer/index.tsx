import React, { useState } from 'react'
import { DrawerContentComponentProps, DrawerContentOptions, DrawerItem } from '@react-navigation/drawer'

import { useDispatch } from 'react-redux'
import { useUser } from '../../hooks/useUser'
import { Routes } from '../../navigation'
import { userActions } from '../../store/user'
import { MaterialCommunityIcons as MaterialIcon } from '@expo/vector-icons'
import { theme } from '../../config/theme'
import { Image, StyleSheet, View } from 'react-native'
import { MiniLabel, SubHeading } from '../../common/styledComponents'
import { Switch } from 'react-native-paper'

const Drawer:React.FC<DrawerContentComponentProps<DrawerContentOptions>> = (props) => {
  const dispatch = useDispatch()
  const user = useUser()
  const { state: { routeNames }, navigation } = props
  const { navigate, reset } = navigation
  const onNavigate = (route:Routes) => navigate<Routes>(route)
  const [toggle, setToggle] = useState(user.role === 'celebrity')
  const onToggleSwitch = (val:boolean) => {
    setToggle(val)
    dispatch(userActions.updateProfile({
      ...user,
      role: val
        ? 'celebrity'
        : 'user'
    }))
    reset({
      index: 0,
      routes: [{ name: 'Home', key: null }]
    })
  }
  const renderRoutes = () => {
    return routeNames.map((route:Routes, i:number) => {
      const isHome = route === 'Home'
      const label = route === 'Videos'
        ? 'My Videos'
        : route
      const icon = isHome
        ? 'home-outline'
        : route === 'Requests'
          ? 'book-outline'
          : route === 'Notifications'
            ? 'bell-outline'
            : route === 'Videos'
              ? 'video-outline'
              : route === 'Profile'
                ? 'account-outline'
                : 'camera'

      return <DrawerItem
                key={i}
                icon={props => <MaterialIcon
                  {...props}
                  name={icon}
                  style={styles.drawerIcon}
                />}
                label={label}
                onPress={() => onNavigate(route)}
                activeBackgroundColor='#fff'
                labelStyle={styles.drawerLabel}
                style={styles.drawerItem}
            />
    })
  }
  const { imageUrl, role, displayName } = user
  return <View style={styles.drawer}>
        <View style={styles.head}>
            <View style={styles.user}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.avatar}
                />
                <View style={styles.userLabel}>
                    <SubHeading style={styles.name}>{displayName}</SubHeading>
                    <MiniLabel style={styles.role}>{role || 'user'}</MiniLabel>
                </View>
            </View>
            <View>
                <Switch
                    theme={{ colors: { accent: 'white' } }}
                    value={toggle}
                    onValueChange={val => onToggleSwitch(val)}
                />
            </View>
        </View>
        {renderRoutes()}
    </View>
}

const styles = StyleSheet.create({
  drawer: {
    height: '100%',
    backgroundColor: theme.colors.primary
  },
  drawerLabel: {
    color: '#fff'
  },
  drawerItem: {
    // height:35,
    justifyContent: 'center'
  },
  drawerIcon: {
    color: '#fff'
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 25
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 100
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userLabel: {
    marginHorizontal: 15,
    justifyContent: 'space-around'
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17
  },
  role: {
    fontSize: 12,
    lineHeight: 10,
    color: '#fff'
  }
})

export default Drawer
