export class FormService {
  static validateEmail(mail:string) {
    try {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)
    } catch (e) {
      console.log(e.message)
      return false
    }
      
  }
}