import { useRoute } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Navbar from '../../components/Navbar'
import NotificationCard from '../../components/NotificationCard'
import useNotifications from '../../hooks/useNotifications'

const Notifications = () => {
  const { name } = useRoute()
  const { notificationList: list } = useNotifications()
  return (
    <SafeAreaView style={[styles.container]}>
      <Navbar
        title={name}
        hideBell
        left='back-arrow'
      />
      <ScrollView>
        {list.map(notification => (
          <NotificationCard
            msg={notification.body}
            key={notification.id}
          />
        ))}
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
