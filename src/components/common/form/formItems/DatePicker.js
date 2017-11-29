/**
 * Created by guangqiang on 2017/11/27.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {commonStyle, deviceInfo, Icon, extraUtil} from '../../../../utils'
import {DatePicker} from '../../datePicker'

class MDatePicker extends Component {

  constructor(props) {
    super(props)
    if (Array.isArray(props.items) && props.items.length === 2) {
      this.state = {
        [props.items[0].key]: props.value[props.items[0].key],
        [props.items[1].key]: props.value[props.items[1].key]
      }
    } else {
      this.state = {
        value: props.value[props.name]
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Array.isArray(this.props.items) && this.props.items.length === 2) {
      let sd = this.props.items[0], ed = this.props.items[1]
      if (nextProps.value[sd.key] !== this.props.value[sd.key]) {
        this.setState({
          [sd.key]: nextProps.value[sd.key],
        })
      }
      if (nextProps.value[ed.key] !== this.props.value[ed.key]) {
        this.setState({
          [ed.key]: nextProps.value[ed.key],
        })
      }
    } else {
      if (nextProps.value[nextProps.name] !== this.props.value[this.props.name]) {
        this.setState({
          value: nextProps.value[nextProps.name]
        })
      }
    }
  }

  getValue() {
    if (Array.isArray(this.props.items) && this.props.items.length === 2) {
      return { ...this.state }
    } else {
      return this.state.value
    }
  }

  formatDate(date) {
    if (typeof date  === 'object') {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (typeof date  === 'string') {
      return date
    } else {
      return ''
    }
  }

  _renderText(item) {
    if (!item) {
      if (!extraUtil.isEmptyObj(this.state.value)) {
        return <Text numberOfLines={1} style={{ color: '#333', textAlign: 'right'}}>{this.formatDate(this.state.value)}</Text>
      } else {
        return <Text numberOfLines={1} style={{ color: '#c8c8cd', textAlign: 'right'}}>{this.props.placeholder}</Text>
      }
    } else {
      if (!extraUtil.isEmptyObj(this.state[item.key])) {
        return <Text numberOfLines={1} style={{ color: '#333', textAlign: 'right'}}>{this.formatDate(this.state[item.key])}</Text>
      } else {
        return <Text numberOfLines={1} style={{ color: '#c8c8cd', textAlign: 'right'}}>{item.placeholder}</Text>
      }
    }
  }

  render() {
    if (Array.isArray(this.props.items) && this.props.items.length === 2) {
      return (
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, paddingRight: 10, height: 49}}>
          <View style={{flexDirection: commonStyle.row, justifyContent: 'flex-end', flex: 1}}>
            {
              this.props.editable ?
                <DatePicker
                  style={{flexDirection: 'row', alignItems: commonStyle.center}}
                  onSelectData={(data) => this.setState({[this.props.items[0].key]: data})}
                >
                  {this._renderText(this.props.items[0])}
                </DatePicker> :
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {this._renderText(this.props.items[0])}
                </View>
            }
            <Text style={{ marginLeft: 10, marginRight: 10 }}>至</Text>
            {
              this.props.editable ?
                <DatePicker
                  onSelectDate={(date) => this.setState({ [this.props.items[1].key]: date })}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {this._renderText(this.props.items[1])}
                </DatePicker> :
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {this._renderText(this.props.items[1])}
                </View>
            }
          </View>
        </View>
      )
    } else {
      return (
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, paddingRight: 10, height: 49}}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}>
            {
              this.props.editable ?
                <DatePicker
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onSelectDate={(date) => this.setState({ value: date })}
                >
                  {this._renderText()}
                  <Icon name={'oneIcon|push_arror_o'} size={20} color="#999" style={{width: 20, height: 20}}/>
                </DatePicker> :
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {this._renderText()}
                </View>
            }
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({

})

export {MDatePicker}