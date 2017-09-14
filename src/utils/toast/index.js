/**
 * Created by guangqiang on 2017/9/10.
 */
import RootToast from 'react-native-root-toast'

const Toast = {
  toast: null,
  show: (msg) => {
    this.toast = RootToast.show(msg, {
      position: 0,
      duration: 1500
    })
  }
}

export {Toast}