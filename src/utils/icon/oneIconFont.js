/**
 * Created by guangqiang on 2017/9/14.
 */
import {createIconSet} from 'react-native-vector-icons'

const glyphMap = {
  tb_Picture: 59032,
  tb_article: 59576,
  tb_Movie: 58904,
  tb_Music: 58881,
  toastError: 58954,
  toastSuccess: 58894,
  toastWarning: 58882
}

const OIcon = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf')

export {OIcon}