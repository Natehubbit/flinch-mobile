import { Notification, NotificationResponse } from 'expo-notifications'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HelperService from '../services/HelperService'
import NotificationService from '../services/NotificationService'
import { toastActions } from '../store/toast'
import * as Notifications from 'expo-notifications'
import NavigationService from '../services/NavigationService'
import { notificationsActions } from '../store/notifications'
import { AppState } from '../store'
import { NotificationMessage } from '../types'
import { useUser } from './useUser'

const useNotifications = () => {
  const dispatch = useDispatch()
  const user = useUser()
  const id = user.role === 'user'
    ? user.id
    : user.celebrity.id
  const [notification, setNotification] = useState('')
  const [showBadge, setShowBadge] = useState(false)
  const list = useSelector((state:AppState) => state.notifications)
  useEffect(() => {
    const unsub = NotificationService
      .listener(id, updateList)
    NotificationService
      .receivedListener(receivedCallback)
    NotificationService
      .responseListener(responseCallback)
    return () => {
      NotificationService
        .removeListeners()
      unsub && unsub()
    }
  }, [])
  useEffect(() => {
    if (!!notification) {
      dispatch(toastActions.setToast({
        label: 'okay',
        msg: notification,
        show: true,
        mode: 'info'
      }))
      HelperService.vibrate()
    }
    console.log(notification)
  }, [notification])
  useEffect(() => {
    const unread = list.filter(l => !l.read).length > 0
    setShowBadge(unread)
  }, [list])
  const updateList = (data:NotificationMessage[]) => {
    dispatch(notificationsActions.listen(data))
  }
  const receivedCallback = (e:Notification) => {
    const { body } = e.request.content
    setNotification(body)
  }
  const responseCallback = (e:NotificationResponse) => {
    const { actionIdentifier, notification } = e
    if (
      actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const {
        request: {
          content: {
            data
          }
        }
      } = notification
      NavigationService.navigate('Request', { data })
    }
  }
  return {
    notification,
    notificationList: list,
    showBadge
  }
}

export default useNotifications
