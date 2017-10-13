/**
 * Created by guangqiang on 2017/9/5.
 */

const parseDate = (dateStr) => {
  let array = dateStr.split(' ')
  let arrayOne = array[0].split('-')
  let arrayTwo = array[1].split(':')
  let date = new Date(arrayOne[0], arrayOne[1] - 1, arrayOne[2], arrayTwo[0], arrayTwo[1], arrayTwo[2])
  return date
}
export {parseDate}