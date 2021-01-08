import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Input from '../../components/Input'
import Img from '../../assets/images/card.svg'
import { maxHeight, maxWidth } from '../../common/styledComponents'
import { FAB } from 'react-native-paper'

const PaymentCard: React.FC = () => {
  const [see, setSee] = useState(true)
  const onToggle = () => setSee(!see)
  return <View
        style={styles.contentContainer}
    >
        <Img style={styles.image} />
        <Input
            left='credit-card'
            label='Card No.'
        />
        <Input
            label='CCV'
            secureTextEntry={see}
            left='lock'
            right='eye'
            onIconClicked={onToggle}
        />
        <FAB
            style={styles.fab}
            icon='chevron-right'
            label='Proceed'
            onPress={() => console.log('go')}
        />
    </View>
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 39,
    backgroundColor: '#fff',
    height: maxHeight - 70
  },
  image: {
    width: maxWidth,
    marginVertical: 20,
    alignSelf: 'center'
  },
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 39
  },
  fabContainer: {
    overflow: 'hidden'
  }

})

export default PaymentCard
