import React from 'react'
import { StyleSheet } from 'react-native'
import { Badge } from 'react-native-paper'
import { COLORS } from '../../config/theme'
import { RequestStatus } from '../../types'

interface TagProps {
  label:RequestStatus;
}

const Tag: React.FC<TagProps> = (props) => {
  const { label } = props
  const color = (label === 'failed' || label === 'urgent')
    ? 'red'
    : label === 'pending'
      ? COLORS.warn
      : COLORS.success
  return <Badge
        visible
        style={[styles.badge, { backgroundColor: color }]}
    >
        {label}
    </Badge>
}

const styles = StyleSheet.create({
  badge: {
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default Tag
