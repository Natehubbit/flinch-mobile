import React from 'react'
import { StyleSheet } from 'react-native'
import { Dialog, Portal, ActivityIndicator } from 'react-native-paper'
import { Paragraph } from '../../common/styledComponents'

interface ModalLoaderProps {
  show?:boolean;
  label?:string
}

const ModalLoader:React.FC<ModalLoaderProps> = (props) => {
  const { show, label } = props
  return (
    <Portal>
      <Dialog visible={show}>
        <Dialog.Content>
          <Paragraph black style={styles.text}>
            {`${label || ''}\n`}
          </Paragraph>
          <ActivityIndicator
            animating
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  }
})

export default ModalLoader
