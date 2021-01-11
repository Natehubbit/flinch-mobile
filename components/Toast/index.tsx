import React from 'react'
import { Snackbar } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { AltMiniLabel } from '../../common/styledComponents'
import { COLORS, theme } from '../../config/theme'
import { useToast } from '../../hooks/useToast'
import { toastActions } from '../../store/toast'

const Toast = () => {
  const dispatch = useDispatch()
  const {
    onDismiss,
    onPress,
    mode,
    msg,
    show,
    label,
    duration
  } = useToast()
  const style =
    mode === 'danger'
      ? { backgroundColor: COLORS.red, color: COLORS.dark }
      : mode === 'info'
        ? { backgroundColor: theme.colors.primary, color: COLORS.dark }
        : mode === 'success'
          ? { backgroundColor: COLORS.success, color: COLORS.dark }
          : null
  const dismiss = () => {
    dispatch(toastActions.resetToast())
  }
  return (
    <Snackbar
        style={style}
        visible={show}
        theme={{ colors: { accent: style && style.color } }}
        onDismiss={onDismiss || dismiss}
        duration={duration}
        action={{
          label,
          onPress: (onPress && onPress) ||
            dismiss
        }}
      >
        <AltMiniLabel>
          {msg}
        </AltMiniLabel>
      </Snackbar>
  )
}

export default Toast
