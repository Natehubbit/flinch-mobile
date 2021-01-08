import React from 'react'
import { StyleSheet, TextProps, View } from 'react-native'
import { SubHeading } from '../../common/styledComponents'
import { theme } from '../../config/theme'

interface SectionHeaderProps extends TextProps {
    title:string;
}

const SectionHeader: React.FC<SectionHeaderProps> = (
  {
    title,
    ...props
  }
) => {
  return <View style={styles.container}>
        <SubHeading {...props} >{title}</SubHeading>
        <View style={styles.line} />
    </View>
}

const styles = StyleSheet.create({
  container: {
    height: 25,
    marginLeft: 12
  },
  line: {
    height: 5,
    width: 17,
    position: 'absolute',
    left: 0,
    backgroundColor: theme.colors.primary,
    bottom: 0,
    borderRadius: 100
  }
})

export default SectionHeader
