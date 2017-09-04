/**
 * Created by guangqiang on 2017/8/30.
 */

/** 公共的全局组件 **/

import {TouchableOpacity, Button} from 'react-native'
import {Venilog} from './venilog'

const _TouchableOpacity = Venilog.createVenilogComponent(TouchableOpacity)
const _Button = Venilog.createVenilogComponent(Button)

export {_TouchableOpacity as TouchableOpacity}
export {_Button as Button}
