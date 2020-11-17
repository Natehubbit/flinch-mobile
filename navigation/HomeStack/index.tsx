import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import Navbar from '../../components/Navbar'
import { RouteParams } from '..'
import Home from '../../screens/Home'
import Search from '../../screens/Search'
import CelebScreen from '../../screens/Celeb'
import Book from '../../screens/Book'
import PaymentMode from '../../screens/PaymentMode'
import PaymentCard from '../../screens/PaymentCard'
import PaymentMobile from '../../screens/PaymentMobile'

const Stack = createStackNavigator<RouteParams>()

const HomeStack = () => {
  const renderHeader = (props:StackHeaderProps) => {
    const { scene: { route: { name } } } = props
    let isHome = name === 'Home'
    let heading = isHome ? 'FLINCH' : name
    if (name === 'Celeb') {
      isHome = false
      heading = 'Celebrity'
    }
    if (name === 'PaymentCard' || name === 'PaymentMobile') {
      heading = 'Payment'
    }
    const showNav = !(name === 'Search')
    if (!showNav) return null
    return <Navbar isHome={isHome} title={heading}/>
  }

  return (
        <Stack.Navigator
            screenOptions={{
              header: props => renderHeader(props)
            }}
        >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Search' component={Search} />
            <Stack.Screen name='Celeb' component={CelebScreen} />
            <Stack.Screen name='Book' component={Book} />
            <Stack.Screen name='Payment' component={PaymentMode} />
            <Stack.Screen name='PaymentCard' component={PaymentCard} />
            <Stack.Screen name='PaymentMobile' component={PaymentMobile} />
        </Stack.Navigator>
  )
}

export default HomeStack
