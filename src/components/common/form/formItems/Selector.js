/**
 * Created by guangqiang on 2017/11/28.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import {commonStyle, deviceInfo, Icon, extraUtil} from '../../../../utils'
import {Actions} from 'react-native-router-flux'

class Selector extends Component {

  constructor(props) {
    super(props)
    if (props.value[props.name] !== undefined && props.value[props.name] !== null) {
      this.state = {
        value: props.value[props.name],
        name: props.value[props.descValue] || '',
        wantProps: props.wantProps || []
      }
    } else {
      this.state = {
        value: '',
        name: props.value[props.descValue] || '',
        wantProps: props.wantProps || []
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value[nextProps.name] !== this.props.value[this.props.name]) {
      this.setState({
        value: nextProps.value[nextProps.name],
        name: nextProps.value[nextProps.descValue]
      })
    }
  }

  getValue() {
    let value = {}
    value[this.props.name] = this.state.value
    if (this.props.descValue) {
      value[this.props.descValue] = this.state.name
    }
    this.state.wantProps.length > 0 && this.state.wantProps.map(item => value[item] = this.state[item])
    return value
  }

  isSelected(data) {
    let id = data.id !== undefined ? data.id : data
    if (this.props.multiSelect) {
      return this.state.value && this.state.value.indexOf(id) !== -1
    } else {
      return (id + '') === (this.state.value + '')
    }
  }

  onConfirm(data) {
    let returnProps = {}
    this.state.wantProps.length > 0 && this.state.wantProps.map(item => returnProps[item] = data[item])
    if (Array.isArray(data)) {
      this.setState({
        ...this.state,
        value: data.map(item => item.id),
        name: data.map(item => item.name).join(', '),
        ...returnProps
      })
    } else if (typeof data === 'object') {
      this.setState({
        ...this.state,
        value: data.id,
        name: data.name,
        ...returnProps
      })
    } else if (data === undefined) {
      this.setState({
        value: '',
        name: ''
      })
    }

    let _obj = {}
    _obj[this.props.name] = data
    this.props.onChange && this.props.onChange(_obj)
    this.props.callback && this.props.callback(data)
  }

  onPress() {
    if ((this.props.onClick && this.props.onClick()) || !this.props.onClick) {
      const {label, maxNum, multiSelect} = this.props
      if (this.props.proSelect) {
        Actions.customSelect({
          title: label,
          maxNum: maxNum,
          multiSelect: multiSelect,
          custom: this.props.customList,
          value: this.state.value,
          name: this.state.name,
          data: this.props.data || this.props.dataFunc,
          pagingFunc: this.props.pagingFunc,
          paging: this.props.paging,
          renderRowData: (data) => ({
            text: data.name || data,
            selected: this.isSelected(data)
          }),
          onConfirm: (data) => this.onConfirm(data)
        })
      } else {
        Actions.selector({
          title: label,
          maxNum: maxNum,
          multiSelect: multiSelect,
          fieldKey: this.props.name,
          data: this.props.data || this.props.dataFunc,
          renderRowData: (data) => ({
            text: data.name || data,
            selected: this.isSelected(data)
          }),
          onConfirm: (data) => this.onConfirm(data)
        })
      }
    }
  }

  renderText() {
    if (this.props.data) {
      if (!extraUtil.isEmptyObj(this.state.value)) {
        if (Array.isArray(this.state.value)) {
          let _arr = this.state.value.map(item => this.props.data[item])
          return <Text numberOfLines={1} style={{flex: 1, color: '#333', textAlign: 'right'}}>{_arr.join(',')}</Text>
        } else {
          return <Text numberOfLines={1} style={{flex: 1, color: '#333', textAlign: 'right'}}>{this.props.data[this.state.value]}</Text>
        }
      } else {
        return <Text numberOfLines={1} style={{flex: 1, color: '#c8c8cd', textAlign: 'right' }}>{this.props.placeholder}</Text>
      }
    } else {
      if (!extraUtil.isEmptyObj(this.state.value)) {
        let showText = this.state.name || (typeof  this.state.value === 'string' ? this.state.value : '')
        return <Text numberOfLines={1} style={{flex: 1, color: '#333', textAlign: 'right' }}>{showText}</Text>
      } else {
        return <Text numberOfLines={1} style={{flex: 1, color: '#c8c8cd', textAlign: 'right' }}>{this.props.placeholder}</Text>
      }
    }
  }

  render() {
    if (this.props.editable) {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.onPress()}>
          {this.renderText()}
          <Icon name={'oneIcon|push_arror_o'} size={20} color="#999" style={styles.icon} />
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={styles.container}>
          {this.renderText()}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    height: 49,
    paddingRight: 10
  },
  icon: {
    width: 20,
    height: 20
  }
})

export {Selector}