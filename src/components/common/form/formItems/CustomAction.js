/**
 * Created by guangqiang on 2017/11/27.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Icon, commonStyle, deviceInfo, extraUtil} from '../../../../utils'
import {Actions} from 'react-native-router-flux'

class CustomAction extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value[props.name],
      name: props.value[props.descValue]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value[nextProps.name] !== this.props.value[this.props.name] && nextProps.value[nextProps.name]) {
      this.setState({
        value: nextProps.value[nextProps.name].value || nextProps.value[nextProps.name],
        name: nextProps.value[nextProps.name] || nextProps.value[nextProps.descValue]
      })
    }
  }

  onConfirm(data) {
    if (Array.isArray(data)) {
      this.setState({
        value: data.map(item => item.id),
        name: data.map(item => item.name).join(', ')
      })
    } else if (typeof data === 'object') {
      this.setState({
        value: data.id,
        name: data.name
      })
    }

    let obj = {}
    obj[this.props.name] = data
    this.props.onChange && this.props.onChange(obj)
    this.props.callback && this.props.callback(obj)
  }

  getValue() {
    return this.state.value
  }

  _renderText() {
    if (this.props.data) {
      if (!extraUtil.isEmptyObj(this.state.value)) {
        return <Text numberOfLines={1} style={{ flex: 1, color: '#333', textAlign: 'right' }}>{this.props.data[this.state.value]}</Text>
      } else {
        return <Text numberOfLines={1} style={{ flex: 1, color: '#c8c8cd', textAlign: 'right' }}>{this.props.placeholder}</Text>
      }
    } else {
      if (!extraUtil.isEmptyObj(this.state.value)) {
        let showText = this.state.name || (typeof this.state.value === 'string' ? this.state.value : '')
        return <Text numberOfLines={1} style={{ flex: 1, color: '#333', textAlign: 'right' }}>{showText}</Text>
      } else {
        return <Text numberOfLines={1} style={{ flex: 1, color: '#c8c8cd', textAlign: 'right' }}>{this.props.placeholder}</Text>
      }
    }
  }

  _onPress() {
    if ((this.props.onClick && this.props.onClick()) || !this.props.onClick) {
      Actions[this.props.type]({
        title: this.props.label,
        value: this.state.value,
        data: this.props.data || this.props.dataFunc,
        params: this.props.params,
        onConfirm: (data) => this.onConfirm(data)
      })
    }
  }

  render() {
    const {editable} = this.props
    if (editable) {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => this._onPress()}
        >
          {this._renderText()}
          <Icon name={'oneIcon|push_arror_o'} size={20} color="#999" style={{width: 20, height: 20}}/>
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={styles.container}>
          {this._renderText()}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 49,
    paddingRight: 10,
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    backgroundColor: commonStyle.white
  }
})

export {CustomAction}