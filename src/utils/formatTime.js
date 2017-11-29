/**
 * Created by guangqiang on 2017/10/3.
 */

const formatTime = {

  formatMediaTime: (duration) => {
    let min = Math.floor(duration / 60)
    let second = duration - min * 60
    min = min >= 10 ? min : '0' + min
    second = second >= 10 ? second : '0' + second
    return min + ':' + second
  },

  timeTohhmmss: (seconds) => {
    let hh, mm, ss

    if(seconds === null || seconds < 0) return

    let pseconds = parseInt(seconds)

    //得到小时
    hh = pseconds / 3600 | 0

    pseconds = parseInt(pseconds) - parseInt(hh) * 3600

    if(parseInt(hh) < 10) {
      hh = "0" + hh
    }

    if(parseInt(hh) >= 24) {
      hh = "00"
    }

    //得到分钟
    mm = parseInt(pseconds) / 60 | 0

    //得到秒
    ss = parseInt(pseconds) - parseInt(mm) * 60

    if(parseInt(mm) < 10) {
      mm = "0" + mm
    }

    if(parseInt(ss) < 10) {
      ss = "0" + ss
    }

    return hh + ":" + mm + ":" + ss
  },

  getTodayDate: () => {
    let now = new Date()
    let yy = now.getFullYear()
    let mm = now.getMonth() + 1
    let dd=now.getDate()
    let day = new Array()
    day[0] = "星期日"
    day[1] = "星期一"
    day[2] = "星期二"
    day[3] = "星期三"
    day[4] = "星期四"
    day[5] = "星期五"
    day[6] = "星期六"
    return( yy + '年' + mm + '月' + dd + '日 ' + day[now.getDay()])
  }
}

export {formatTime}