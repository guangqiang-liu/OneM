/**
 * Created by guangqiang on 2017/9/10.
 */
const articleType = {
  PICTURE: 'PICTURE',
  READING: 'READING',
  MUSIC: 'MUSIC',
  MOVIE: 'MOVIE'
}

const beginTime = {
  picture: {
    beginYear: 2012,
    beginMonth: 9
  },
  essay: {
    beginYear: 2012,
    beginMonth: 9
  },
  serial: {
    beginYear: 2016,
    beginMonth: 0  //0
  },
  question: {
    beginYear: 2012,
    beginMonth: 9
  },
  music: {
    beginYear: 2016,
    beginMonth: 0
  }
}

const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const logEventType = {
  enterPage: 3001,
  exitPage: 3002,
  click: 3003,
  slide: 3004,
  gesture: 3005
}

export {articleType, beginTime, monthList, logEventType}