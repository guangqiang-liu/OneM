/**
 * Created by guangqiang on 2017/8/30.
 */
const PATH = {
  // 获取首页的图文列表
  PICTURE_LIST: '/hp/idlist/0',
  // 获取图文详情数据
  PICTURE_DETAIL: '/hp/detail/',
  PICTURE_GRID_LIST: '/hp/bymonth/',

  MOVIE_LIST: '/movie/list/',
  MOVIE_STORY: '/movie/${id}/story/1/0',

  // 时光网数据
  MOVIE_SHOWTIME: '/Showtime/LocationMovies.api?locationId=290',
  MOVIE_COMEING_NEW: '/Movie/MovieComingNew.api?locationId=290',
  MOVIE_DETAIL: '/movie/detail.api?locationId=290',
  MOVIE_COMMENT_LIST: '/movie/hotComment.api',
  MOVIE_MINI_COMMENT_LIST: '/Showtime/HotMovieComments.api',
  MOVIE_PLUS_COMMENT_LIST: '/Movie/HotLongComments.api',
  MOVIE_TRAILER_LIST: '/Movie/Video.api',
  MOVIE_ACTOR_LIST: '/Movie/MovieCreditsWithTypes.api',
  MOVIE_PICTURE_LIST: '/Movie/ImageAll.api',

  MUSIC_ID_LIST: '/music/idlist/0',
  MUSIC_DETAIL: '/music/detail/',
  MUSIC_XIAMI_MUSIC: '/run?song=http://www.xiami.com/song/',
  MUSIC_LIST: '/music/bymonth/',

  READING_BANNER: '/reading/carousel',
  READING_BANNER_CONTENT: '/reading/carousel/',
  READING_ARTICLE_LIST: '/reading/index',
  READING_ESSAY_DETAIL: '/essay/',
  READING_SERIAL_DETAIL: '/serialcontent/',
  READING_QUESTION_DETAIL: '/question/',
  READING_COMMENT_LIST: '/comment/praiseandtime/',
  READING_ARTICLE_CATE_LIST: '/bymonth/',

  // 获取find模块数据
  FIND: '/xxx/xxx',
  // 首页H5
  HOME_MSITE: '/xxx/xxxx',
  // 打点
  VENILOG: '/v2/book/1220562',

}

export {PATH}