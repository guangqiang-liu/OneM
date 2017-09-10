/**
 * Created by guangqiang on 2017/9/10.
 */
import Toast from 'react-native-root-toast'

const RootToast = {
  toast: null,
  show: (msg) => {
    this.toast = Toast.show(msg, {
      position: 0,
      duration: 1500
    })
  }
}

export default RootToast