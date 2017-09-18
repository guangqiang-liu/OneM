/**
 * Created by guangqiang on 2017/9/18.
 */
function ValidateUtil(validateArray) {
  let res = [];
  for (let i = 0; i < validateArray.length; i++) {
    let _validate = {};
    _validate.func = validateArray[i].func;
    _validate.msg = validateArray[i].msg;
    res.push(_validate);
  }
  return res;
}

function Required(field) {
  if (typeof (field) === 'object')
    return !(!field || (Array.isArray(field) && field.length === 0) ||  (field.toString() === '[object Object]' && Object.keys(field).length === 0));
  if (typeof (field) === 'boolean' || typeof (field) === 'number')
    return true;
  if (typeof (field) === 'string' && field.trim().length === 0)
    return false;
  return !!field;
}

function isNumber(field) {
  return !isNaN(field)
}

function ContactValidate(contactNameList, contactMobileList) {
  for (let i = 0; i < contactNameList.length; i++) {
    if (contactNameList[i] === '' || contactMobileList[i] === '') {
      return false;
    }
  }
  return true;
}

/**
 * 判断是否是手机号码
 */
function checkMobile(mobile) {
  return /^[1][0-9]{10}$/.test(mobile)
}

export {
  ValidateUtil,
  Required,
  ContactValidate,
  checkMobile,
  isNumber,
}