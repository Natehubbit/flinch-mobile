import { useRoute } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Navbar from '../../components/Navbar'
import NotificationCard from '../../components/NotificationCard'

const Notifications = () => {
  const { name } = useRoute()
  return (
    <SafeAreaView style={[styles.container]}>
      <Navbar
        title={name}
        hideBell
        left='back-arrow'
      />
      <ScrollView>
        <NotificationCard/>
        <NotificationCard/>
        <NotificationCard viewed/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notifications

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
