/**
 * Created by guangqiang on 2017/8/26.
 */
import {ApiSource}  from '../../constants/commonType'
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'

var getUrl = "/Showtime/LocationMovies.api?locationId=290"
var postUrl = "https://api.douban.com/v2/book/1220562"

const chatList = (params) => getFetch(getUrl, params, ApiSource.TIMEMOVIE)

const chatFriend = (params) => postFetch(postUrl, params)

export default {
  chatList,
  chatFriend
}