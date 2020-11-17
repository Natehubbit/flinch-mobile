import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RequestsPending from '../../screens/RequestsPending'
import RequestsReviewed from '../../screens/RequestsReviewed'
import { StyleSheet } from 'react-native'
import { theme } from '../../config/theme'

const Tab = createMaterialTopTabNavigator()

function RequestsTabs () {
  return (
        <Tab.Navigator
            tabBarOptions={{
              style: styles.tab,
              labelStyle: styles.label,
              indicatorStyle: {
                backgroundColor: theme.colors.accent
              }
            }}
            style={styles.tab}
        >
            <Tab.Screen name="Pending" component={RequestsPending} />
            <Tab.Screen name="Reviewed" component={RequestsReviewed} />
        </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tab: {
    elevation: 0
  },
  label: {
    textTransform: 'none',
    fontFamily: 'MontserratAlternates-Bold',
    fontSize: 15
  }
})

export default RequestsTabs
