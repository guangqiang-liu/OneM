/**
 * Created by guangqiang on 2017/9/6.
 */
import {combineReducers} from 'redux'
import movieList from './movieList'
import movieDetail from './movieDetail'
import commentList from './comment/commentList'
import actor from './actor'
import picture from './picture'
const reducer = combineReducers({
  movieList,
  movieDetail,
  commentList,
  actor,
  picture
})

export default reducer