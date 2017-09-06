/**
 * Created by guangqiang on 2017/9/5.
 */

const parseDate = (dateStr) => {
  var array = dateStr.split(' ');//这种解析方式还是有点危险, 将来one接口数据一遍不就完了
  var arrayOne = array[0].split('-');
  var arrayTwo = array[1].split(':');//月份表示范围是0 ~ 11, 所以传进去的参数得减去1
  var date = new Date(arrayOne[0], arrayOne[1] - 1, arrayOne[2], arrayTwo[0], arrayTwo[1], arrayTwo[2]);
  return date;
}
export {parseDate}