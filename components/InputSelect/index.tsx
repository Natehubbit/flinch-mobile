import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph } from '../../common/styledComponents'
import { COLORS } from '../../config/theme'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { TouchableRipple } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { selectorActions } from '../../store/selector'
import { useSelect } from '../../hooks/selector'

interface InputSelectProps {
  right: string;
  value: string;
  placeholder: string;
  field?: string;
  options?: string[];
  onPress?: ()=>void;
  onChange?: any;
}

const InputSelect: React.FC<InputSelectProps> = ({
  placeholder,
  right,
  value: val,
  onChange,
  field,
  options
}) => {
  useEffect(() => {
    val &&
    dispatch(selectorActions
      .setSelector({ value: val }))
  }, [])
  const dispatch = useDispatch()
  const { value } = useSelect()
  useEffect(() => {
    onChange && onChange(field, value)
  }, [value])
  const onPress = () => {
    dispatch(selectorActions
      .openSelector(
        options,
        'Choose an Ocassion'
      ))
  }
  const hasVal = !!value
  return (
    <TouchableRipple
      style={[styles.input]}
      onPress={onPress}
    >
      <>
      <View style={[styles.icon]}>
        <Icon
          name='calendar-outline'
          size={24}
          color={COLORS.iconGrey}
        />
      </View>
      <View style={[styles.label]}>
        {!hasVal && <Paragraph style={[styles.txt]} black>
          {placeholder}
        </Paragraph>}
        {hasVal && <Paragraph style={[styles.val]} black>
          {value}
        </Paragraph>}
      </View>
      <View style={[styles.icon]}>
        <Icon
          name={right}
          size={24}
          color={COLORS.iconGrey}
        />
      </View>
      </>
    </TouchableRipple>
  )
}

export default InputSelect

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    height: 54,
    backgroundColor: COLORS.lightPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.light2,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  label: {
    flex: 8
  },
  icon: {
    flex: 2,
    alignItems: 'center'
  },
  txt: {
    fontSize: 16,
    color: COLORS.iconGrey
  },
  val: {
    fontSize: 16
  }
})
