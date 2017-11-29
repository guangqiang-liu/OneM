/**
 * Created by guangqiang on 2017/11/27.
 */
import React, {Component} from 'react'
import { Text, StyleSheet, View, TouchableOpacity, DatePickerAndroid, DatePickerIOS, Modal, Platform } from 'react-native'
import { commonStyle, deviceInfo } from '../../../utils'

class LSDatePickerIOS extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      date: new Date()
    }
  }

  openDatePicker() {
    this.setState({visible: true})
  }

  onCancel() {
    this.setState({visible: false})
  }

  onOK() {
    this.setState({visible: false})
    this.props.onSelectDate && this.props.onSelectDate(this.state.date)
  }

  render() {
    const { style, ...other } = this.props
    return (
      <TouchableOpacity
        style={[style]}
        activeOpactiy={1}
        onPress={this.openDatePicker.bind(this)}>
        {this.props.children}
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => this.setState({ visible: false })}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ visible: false, })} />
            <View style={styles.innerContainer}>
              <View style={styles.btnBar}>
                <TouchableOpacity onPress={this.onCancel.bind(this)}>
                  <Text style={styles.btn}>取消</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}/>
                <TouchableOpacity onPress={this.onOK.bind(this)}>
                  <Text style={[styles.btn]}>完成</Text>
                </TouchableOpacity>
              </View>
              <DatePickerIOS
                date={this.state.date}
                mode="date"
                onDateChange={(date) => this.setState({ date })}
                style={{ width: deviceInfo.deviceWidth }}
                {...other}
              />
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }
}

class LSDatePickerAndroid extends Component{

  async openDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        let date = new Date(year, month, day)
        this.props.onSelectDate && this.props.onSelectDate(date)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  render() {
    const { style, ...other } = this.props
    return (
      <TouchableOpacity activeOpactiy={1} onPress={this.openDatePicker.bind(this)} style={style}>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 0,
  },
  btnBar: {
    flexDirection: 'row',
    height: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    width: deviceInfo.deviceWidth,
  },
  btn: {
    color: commonStyle.blue,
    width: 40,
    textAlign: 'center',
  }
})

const DatePicker = Platform.OS === 'ios' ? LSDatePickerIOS : LSDatePickerAndroid

export { DatePicker }