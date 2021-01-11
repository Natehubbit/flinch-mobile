import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { Paragraph } from '../../common/styledComponents'
import { COLORS } from '../../config/theme'
import { useUser } from '../../hooks/useUser'

interface NotificationCardProps {
  msg: string;
  read?:boolean;
  type?:'success'|'failed'|'default'
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  read,
  msg,
  type
}) => {
  const { imageUrl } = useUser()
  const opacity = read ? 0.4 : 1
  return (
    <TouchableRipple
      onPress={() => console.log('d')}
      style={[styles.container, { opacity }]}
      >
      <View
        style={[styles.info]}
      >
        <View>
          <Image
            source={{ uri: imageUrl }}
            style={[styles.img]}
          />
        </View>
        <View style={[styles.content]}>
          <Paragraph black numberOfLines={2} style={[styles.msg]}>
            {/* <Paragraph black style={[styles.name]}>
              Shatta Wale{'\t'}
            </Paragraph> */}
            {msg}
          </Paragraph>
          <Paragraph black style={[styles.time]}>
            20 minutes ago
          </Paragraph>
        </View>
      </View>
    </TouchableRipple>
  )
}

export default NotificationCard

const styles = StyleSheet.create({
  container: {
    height: 90,
    borderLeftColor: COLORS.success,
    borderLeftWidth: 3,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 17,
    flexDirection: 'row'
  },
  img: {
    height: 46,
    width: 46,
    borderRadius: 100
  },
  content: {
    marginLeft: 15,
    paddingRight: 55
  },
  time: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 5
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 55
  },
  msg: {
    fontSize: 12
  },
  name: {
    fontWeight: 'bold'
  }
})
