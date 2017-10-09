/**
 * Created by guangqiang on 2017/9/6.
 */
import {combineReducers} from 'redux'
import movieList from './movieList'
import movieDetail from './movieDetail'
const reducer = combineReducers({
  movieList,
  movieDetail
})

export default reducer