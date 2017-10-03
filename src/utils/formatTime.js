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
  }
}

export {formatTime}