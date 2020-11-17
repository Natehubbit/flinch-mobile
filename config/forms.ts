import * as Yup from 'yup'

export const BOOK_FORM = {
  recipient: '',
  instructions: '',
  occasion: ''
}

export const BookSchema = Yup.object().shape({
  recipient: Yup.string()
    .required('*Required'),
  occasion: Yup.string()
    .required('*Required'),
  instructions: Yup.string()
    .required('*Required')
})
