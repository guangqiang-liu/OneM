/**
 * Created by guangqiang on 2017/11/26.
 */

const fields = [
  {
    key: 'contactName',
    label: '联系人',
    subLabel: '*',
    placeholder: '请输入联系人姓名',
    type: 'TextInput'
  },
  {
    key: 'mobile',
    label: '联系手机',
    subLabel: '',
    placeholder: '请输入联系手机',
    type: 'TextInput',
    keyboardType: 'numeric',
  },
  {
    key: 'tel',
    label: '固定电话',
    subLabel: '',
    placeholder: '请输入联系电话',
    type: 'TextInput',
    keyboardType: 'numeric',
  },
  {
    key: 'position',
    label: '职位',
    subLabel: '*',
    placeholder: '请输入联系人职位',
    type: 'TextInput',
  },
  {
    key: 'wechat',
    label: '微信号',
    subLabel: '',
    placeholder: '请输入微信号',
    type: 'TextInput',
  },
  {
    key: 'qq',
    label: 'QQ号',
    subLabel: '',
    placeholder: '请输入QQ号',
    type: 'TextInput',
    keyboardType: 'numeric',
  },]

export {
  fields,
}