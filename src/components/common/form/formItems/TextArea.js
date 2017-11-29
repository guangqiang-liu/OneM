/**
 * Created by guangqiang on 2017/11/27.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import {commonStyle, deviceInfo} from '../../../../utils'

class TextArea extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value[props.name]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value[nextProps.name] !== this.props.value[this.props.name]) {
      this.setState({
        value: nextProps.value[nextProps.name]
      })
    }
  }

  onConfirm(value) {

    this.setState({value: value})

    let obj = {}
    obj[this.props.name] = value
    this.props.onChange && this.props.onChange(obj)
  }

  getValue() {
    return this.state.value
  }

  onChangeText(value) {
    if (this.props.maxWordage && this.props.maxWordage < value.length) {
      if (value.length === this.props.maxWordage + 1) {
        this.setState({value: this.state.value.substr(0, this.props.maxWordage)})
      } else {
        this.setState({value: text.substr(0, this.props.maxWordage)})
      }
    } else {
      this.setState({value})
    }
  }

  render() {
    let wordage = this.state.value ? this.state.value.length : 0
    return (
      <View>
        <TextInput
          style={[styles.textArea, this.props.style]}
          placeholder={this.props.placeholder}
          editable={this.props.editable}
          underlineColorAndroid={'transparent'}
          placeholderTextColor={commonStyle.placeholderTextColor}
          textAlignVertical='top'
          autoFocus={false}
          multiline={true}
          onChangeText={(value) => this.onChangeText(value)}
          value={this.state.value}
        />
        {
          this.props.maxWordage ?
            <View style={[styles.maxWordageStyle, this.props.maxWordageStyle]}>
              <Text style={{fontSize: 12, color: '#999'}}>{this.props.maxWordage - wordage}</Text>
            </View> : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textArea: {
    height: 100,
    width: deviceInfo.deviceWidth - 20,
    padding: 10,
    borderWidth: commonStyle.lineWidth,
    borderColor: commonStyle.lineColor,
    borderRadius: 5,
    margin: 10,
    marginLeft: 0,
    fontSize: 14,
    color: commonStyle.textBlockColor
  },
  maxWordageStyle: {
    position: commonStyle.absolute,
    right: 12,
    bottom: 12,
  }
})

export {TextArea}