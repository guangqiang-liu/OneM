/**
 * Created by guangqiang on 2017/11/26.
 */
import {commonStyle} from '../../../../utils'

const fields = [
  {
    title: 'TextInput',
    items: [
      {
        key: 'TextInput',
        label: '货号',
        subLabel: '*',
        placeholder: '请输入商品货号',
        type: 'TextInput'
      }]
  },
  {
    title: 'ButtonGroup',
    items: [
      {
        key: 'ButtonGroup',
        label: '商品类型',
        subLabel: '*',
        type: 'ButtonGroup',
        items: [
          {
            text: '样品',
            selected: () => true,
            selectedStyle: { borderColor: commonStyle.themeColor },
            textSelectedStyle: { color: commonStyle.themeColor },
            style: { width: 58, height: 30, borderRadius: 20, borderColor: '#999'},
            onPress: 'onSelectYB',
          }, {
            text: '大货',
            selected: () => false,
            selectedStyle: { borderColor: commonStyle.themeColor },
            textSelectedStyle: { color: commonStyle.themeColor },
            style: { width: 58, height: 30, borderRadius: 20, borderColor: '#999' },
            onPress: 'onSelectDH',
          }
        ]
      }]
  },
  {
    title: 'Radio',
    items: [
      {
        key: 'hasColorStand',
        label: '有无样卡',
        type: 'Radio',
        items: [{
          label: '有', value: true
        }, {
          label: '无', value: false
        }]
      }]
  },
  {
    title: 'CustomView',
    items: [
      {
        key: 'View',
        label: '销售价',
        subLabel: '*',
        view: 'renderView1',
        type: 'View'
      }]
  },
  {
    title: 'DatePicker',
    items: [
      {
        key: 'DatePicker',
        label: '发送日期',
        subLabel: '*',
        placeholder: '请选择日期',
        type: 'DatePicker'
      }]
  },
  {
    title: 'Button',
    items: [
      {
        key: 'Button',
        text: '更多属性',
        textStyle: { color: '#E74C3C', fontSize: 16 },
        rowStyle: { justifyContent: 'center', marginBottom: 10, marginTop: 10},
        style: { borderRadius: 20, width: 122, height: 36, borderColor: '#E74C3C' },
        onPress: 'getMoreProp',
        type: 'Button'
      }]
  },
  {
    title: 'CheckBox',
    items: [
      {
        key: 'goodsType',
        label: '品类',
        subLabel: '*',
        type: 'CheckBox',
        items: [{
          label: '样品',
          value: 'YP',
        }, {
          label: '大货',
          value: 'DH',
        }],
      }]
  },
  {
    title: 'Selector',
    items: [
      {
        key: 'feeType',
        name: 'feeTypeText',
        label: '物流费用',
        subLabel: '*',
        placeholder: '请选择物流费用',
        dataFunc: 'loadFeeType',
        type: 'Selector'
      }
    ]
  },
  {
    title: 'CustomAction',
    items: [
      {
        key: 'CustomAction',
        name: 'feeTypeText',
        label: '收货地址',
        subLabel: '*',
        placeholder: '请选择收货地址',
        type: 'userLogin'
      }
    ]
  },
  {
    title: 'Switch',
    items: [
      {
        key: 'Switch',
        label: '是否显示手机号',
        subLabel: '*',
        type: 'Switch'
      }]
  },
  {
    title: 'TextArea',
    items: [
      {
        key: 'TextArea',
        subLabel: '',
        placeholder: '请输入备注',
        maxWordage: 1000,
        type: 'TextArea',
      }
    ]
  }
]

export { fields }