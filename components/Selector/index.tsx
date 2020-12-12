import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, RadioButton, TouchableRipple } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { MiniLabel, SubHeading } from '../../common/styledComponents'
import { COLORS, theme } from '../../config/theme'
import { useSelect } from '../../hooks/selector'
import { selectorActions } from '../../store/selector'

export interface SelectorProps {
  onHide?: ()=>void;
}

const Selector: React.FC<SelectorProps> = ({
  onHide
}) => {
  const dispatch = useDispatch()
  const {
    show,
    value,
    // onSelect,
    options,
    title
  } = useSelect()
  const onPress = (val:string) => {
    dispatch(selectorActions.setSelector({ value: val }))
  }
  const close = () => {
    dispatch(selectorActions.setSelector({ show: false }))
  }
  const checked = (option:string) => {
    return value === option ? 'checked' : 'unchecked'
  }
  const onOkay = () => {
    close()
  }
  const onCancel = () => {
    dispatch(selectorActions.resetSelector())
  }
  return show && (
      <View style={[styles.container]}>
        <SubHeading>{title}</SubHeading>
          <ScrollView contentContainerStyle={[styles.scroll]}>
            {options.map((option, i) =>
            <TouchableRipple onPress={() => onPress(option)} key={i} style={[styles.option]}>
              <>
                <RadioButton
                  color={theme.colors.primary}
                  key={i}
                  value={option}
                  status={checked(option)}
                  onPress={() => onPress(option)}
                />
                <MiniLabel>{option}</MiniLabel>
              </>
            </TouchableRipple>
            )}
          </ScrollView>
          <View style={[styles.btns]}>
            <Button
              color={theme.colors.primary}
              uppercase={false}
              onPress={onOkay} >
              Okay
            </Button>
            <Button
              color={COLORS.red}
              uppercase={false}
              onPress={onCancel} >
              Cancel
            </Button>
          </View>
      </View>
  )
}

export default Selector

const styles = StyleSheet.create({
  container: {
    height: '80%',
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 4,
    padding: 17
  },
  option: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  scroll: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 10
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40
  }
})
