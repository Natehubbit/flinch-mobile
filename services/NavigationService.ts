import { NavigationContainerRef } from '@react-navigation/native'
import { Routes } from '../navigation'

export default class NavigationService {
  static navRef: NavigationContainerRef = null

  static setRef (ref:NavigationContainerRef) {
    this.navRef = ref
  }

  static reset (route:Routes) {
    this.navRef.reset({
      index: 0,
      routes: [{ name: route }]
    })
  }

  static navigate (route:Routes, params:object) {
    setTimeout(() => {
      this.navRef && this
        .navRef
        .navigate<Routes>(route, params)
    }, 200)
  }
}
