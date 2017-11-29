/**
 * Created by guangqiang on 2017/11/28.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView} from 'react-native'
import {commonStyle, deviceInfo, Toast, Icon} from '../../../utils'
import {BaseComponent} from '../../base/baseComponent'
import TimerMixni from 'react-timer-mixin'
import {Actions} from 'react-native-router-flux'

export default class Selector extends BaseComponent {

  minins: [TimerMixni]

  constructor(props) {
    super(props)
    this._poping = false
    this.timer = null
    this.state = {
      dataSource: []
    }
  }

  navigationBarProps() {
    return {
      title: 'list'
    }
  }

  renderRowData(item) {
    if (typeof item === 'object') {
      item = {
        ...item,
        row: this.props.renderRowData(item)
      }
    } else if (typeof item === 'string') {
      item = {
        name: item,
        id: item,
        row: this.props.renderRowData(item)
      }
    }
    return item
  }

  componentDidMount() {
    let _dataSource = []
    if (Array.isArray(this.props.data)) {
      _dataSource = this.props.data.map((item, index) => this.renderRowData(item))
      this.setState({dataSource: _dataSource})
    } else if (typeof this.props.data === 'object') {
      let _arr = []
      for (let i in this.props.data) {
        this.props.data.hasOwnProperty(i) && _arr.push({id: i, name: this.props.data[i]})
      }
      _dataSource = _arr.map((item, index) => this.renderRowData(item))
      this.setState({dataSource: _dataSource})
    } else if (typeof this.props.data === 'function') {
      this.props.data((data) => {
        if (data && Array.isArray(data)) {
          _dataSource = data.map((item, index) => this.renderRowData(item))
        }
        this.setState({dataSource: _dataSource})
      })
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  _onSelect(item) {
    let _arr = this.state.dataSource.filter(item => item.row.selected)
    if (item.row.selected || _arr.length < this.props.maxNum || !this.props.maxNum) {
      item.row.selected = !item.row.selected
      this.setState({
        dataSource: this.state.dataSource
      })
    } else {
      Toast.showWarning(`最多可选择${this.props.maxNum}个`)
    }
  }

  _onConfirm(item) {
    let data = []
    if (!this._poping) {
      this._poping = true
      if (this.props.multiSelect) {
        for (let i = 0; i < this.state.dataSource.length; i++) {
          if (this.state.dataSource[i].row.selected) {
            data.push({...this.state.dataSource[i]})
          }
        }
      } else {
        for (let i = 0; i < this.state.dataSource.length; i++) {
          this.state.dataSource[i].row.selected = false
        }
        item.row.selected = true
        this.setState({dataSource: this.state.dataSource})
        data = {...item}
      }
      this.timer = setTimeout(() => {
        this.props.onConfirm && this.props.onConfirm(data)
        Actions.pop()
      }, 100)
    }
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {
            this.state.dataSource.length ?
              this.state.dataSource.map((item, index) => {
                if (item.row) {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.cell}
                      activeOpacity={0.8}
                      onPress={() => this.props.multiSelect ? this._onSelect(item) : this._onConfirm(item)}
                    >
                      <Text style={[styles.text, item.row.selected ? styles.textSelected : null]}>{item.row.text}</Text>
                      {
                        this.props.multiSelect ?
                          (
                            item.row.selected ?
                              <Icon name={'oneIcon|selected_s'} size={20} color={commonStyle.themeColor} style={styles.icon} /> :
                              <Icon name={'oneIcon|unselected_o'} size={20} color={commonStyle.themeColor} style={styles.icon} />
                          ) :
                          (
                            item.row.selected ? <Icon name={'oneIcon|check_success_o'} size={20} color={commonStyle.themeColor} style={styles.icon} /> : null
                          )
                      }
                    </TouchableOpacity>
                  )
                }
              }) : <ActivityIndicator style={{ marginTop: 80 }}/>
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  },
  cell: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    borderBottomColor: commonStyle.lineColor,
    borderBottomWidth: commonStyle.lineWidth,
    height: 44,
    paddingHorizontal: 20
  },
  text: {
    fontSize: 14,
    flex: 1
  },
  textSelected: {
    color: commonStyle.themeColor
  },
  icon: {
    width: 20,
    height: 20
  }
})