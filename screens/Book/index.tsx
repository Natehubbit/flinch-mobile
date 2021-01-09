import React, { useEffect, useRef } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { maxWidth, Paragraph } from '../../common/styledComponents'
import Img from '../../assets/images/book.svg'
import { ScrollView } from 'react-native-gesture-handler'
import Input from '../../components/Input'
import { useNavigation, useRoute } from '@react-navigation/native'
import { BookScreenRouteProps, Routes } from '../../navigation'
import { Button, HelperText } from 'react-native-paper'
import { BookSchema, BOOK_FORM } from '../../config/forms'
import { Formik } from 'formik'
import { BookForm, Request } from '../../types'
import { useUser } from '../../hooks/useUser'
import { useDispatch } from 'react-redux'
import { requestActions } from '../../store/request'
import { useLoader } from '../../hooks/useLoader'
import { useRequest } from '../../hooks/useRequest'
import InputSelect from '../../components/InputSelect'
import { useSelect } from '../../hooks/selector'
import { OCCASIONS } from '../../common/constants'

const Book: React.FC = () => {
  const dispatch = useDispatch()
  const request = useRequest()
  const mounted = useRef(false)
  const { bookingLoader: booking } = useLoader()
  const { navigate } = useNavigation()
  const { params: { data } } = useRoute<BookScreenRouteProps>()
  const { displayName, id: userId } = useUser()
  const { id, price, alias, imageUrl } = data
  const { value: occasion } = useSelect()
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      !booking &&
      request.id &&
      navigate<Routes>('Payment')
    }
  }, [booking])
  const onSubmit = (values:BookForm) => {
    const data:Request = {
      celebrity: {
        id,
        name: alias,
        imageUrl
      },
      requestor: {
        id: userId,
        name: displayName
      },
      response: {
        status: 'pending',
        videoUri: '',
        duration: 0,
        thumbnailUri: '',
        timestamp: Date.now()
      },
      payment: {
        id: '',
        amount: price.amount,
        currency: price.currency,
        payed: false,
        timestamp: 0
      },
      status: 'pending',
      price,
      timestamp: Date.now(),
      ...values
    }
    dispatch(requestActions.createRequest(data))
    request.id &&
    navigate<Routes>('Payment')
  }
  const renderForm = () => {
    return (
            <Formik
              initialValues={BOOK_FORM}
              onSubmit={onSubmit}
              validationSchema={BookSchema}
              enableReinitialize
            >
                {({
                  errors,
                  touched,
                  values,
                  handleSubmit,
                  handleChange,
                  setFieldValue
                }) => {
                  const {
                    instructions,
                    recipient
                  } = values
                  return <>
                        <Input
                          label='Recipient Name'
                          left='account-outline'
                          value={recipient}
                          disabled={booking}
                          onChangeText={handleChange('recipient')}
                        />
                        {errors.recipient && touched.recipient && (
                            <HelperText type='error'>{errors.recipient}</HelperText>
                        )}
                        <InputSelect
                          value={occasion}
                          placeholder='Ocassion'
                          right='chevron-down'
                          field='occasion'
                          onChange={setFieldValue}
                          options={OCCASIONS}
                        />
                        {/* <Input
                          label='Occasion'
                          left='calendar'
                          disabled={booking}
                          value={occasion}
                          onChangeText={handleChange('occasion')}
                        /> */}
                        {errors.occasion && touched.occasion && (
                          <HelperText type='error'>{errors.occasion}</HelperText>
                        )}
                        <Input
                            disabled={booking}
                            label='Instructions'
                            left='information-outline'
                            style={{ height: 83 }}
                            value={instructions}
                            onChangeText={handleChange('instructions')}
                            multiline
                        />
                        {errors.instructions && touched.instructions && (
                          <HelperText type='error'>{errors.instructions}</HelperText>
                        )}
                        <Button
                            uppercase={false}
                            mode='contained'
                            theme={{ roundness: 100 }}
                            style={styles.btn}
                            onPress={handleSubmit}
                            loading={booking}
                            disabled={booking}
                        >
                          Submit
                        </Button>
                    </>
                }}
            </Formik>
    )
  }
  return <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
        <Img style={styles.image} width={maxWidth}/>
        <View style={styles.card}>
            <View style={styles.celeb}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.celebDp}
                />
                <Paragraph black>{alias}</Paragraph>
            </View>
            {renderForm()}
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  image: {
    width: maxWidth,
    marginVertical: 20
  },
  btn: {
    marginTop: 24,
    marginBottom: 12,
    justifyContent: 'center'
  },
  celeb: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  celebDp: {
    height: 35,
    width: 35,
    borderRadius: 100,
    marginRight: 12
  },
  card: {
    elevation: 4,
    padding: 20,
    backgroundColor: 'white',
    width: maxWidth * 0.9,
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: 'red',
    borderRadius: 10
  }
})

export default Book
