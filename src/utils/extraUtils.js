/**
 * Created by guangqiang on 2017/11/28.
 */

const extraUtil = {

  isNullStr: val => {
    if (val === undefined || val === "undefined" || val === null || val === "null" || val === "NULL" || val === "" || val === '') {
      return true
    }
    return false
  },

  isEmptyObj: obj => {
    if (typeof obj === 'object') {
      {return !obj || (Array.isArray(obj) && obj.length === 0) ||  (obj.toString() === '[object Object]' && Object.keys(obj).length === 0)}
    } else if (typeof obj === 'boolean' || typeof obj === 'number') {
      return false
    } else if (typeof obj === 'string' && obj.trim().length === 0) {
      return true
    } else {
      return !obj
    }
  }
}

export {extraUtil}