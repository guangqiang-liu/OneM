/**
 * Created by guangqiang on 2017/11/26.
 */
import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Switch} from 'react-native'
import {Icon,commonStyle, deviceInfo} from '../../../utils'
import {Actions} from 'react-native-router-flux'

class Form extends Component {

  constructor(props) {
    super(props)

    this.fields = {
      TextInput,
      Text,
      View,
      Switch
    }

    this.state = {
      ...props.value
    }

    this._component = {}
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  _isReadOnly(fields) {
    if (typeof  fields === 'function') {
      return fields()
    } else {
      return fields
    }
  }

  inputOnChange(value) {
  }

  renderGroupForm(field) {
    return (
      <View>
      </View>
    )
  }

  renderFields(fields) {

    let fieldCount = fields.length ? fields.length : 0

    return fields.map((field, index) => {

      let isLastField = true
      if (fieldCount === index + 1 || fields[index + 1].title !== undefined) {
        isLastField = false
      }

      if (field.title !== undefined && field.show !== false) {
        return this.renderGroupForm(field)
      } else {
        let {show, type, label, subLabel, subTitle, ...other} = field
        let otherProps = {...other}
        Object.keys(otherProps).map((key, index) => {
          if (key.indexOf('on') === 0 || key === 'callback' || key === 'dataFunc' || key === 'view') {
            otherProps[key] = this.props[otherProps[key]]
          }
        })

        let isEditable = !this.props.readOnly && !this._isReadOnly(field.readOnly)

        if (show !== false) {
          if (this.fields[type]) {
            if (type === 'TextInput') {
              return (
                <View style={[styles.row, !isLastField ? {borderBottomWidth: 1, borderBottomColor: commonStyle.lineColor} : null]}>
                  <View
                    key={index}
                    style={[styles.content, isLastField ? styles.lastLine : null]}>
                    {
                      label ?
                        <View style={styles.leftPanel}>
                          <View style={styles.leftTitle}>
                            <Text style={{fontSize: 15, color: commonStyle.textBlockColor}}>{label}</Text>
                            <Text style={{fontSize: 20, color: commonStyle.red}}>{subLabel}</Text>
                          </View>
                          {
                            subTitle ?
                              <View style={styles.subTitle}>
                                <Text style={{fontSize: 12, color: commonStyle.textGrayColor}}>{subTitle}</Text>
                              </View> : null
                          }
                        </View> : null
                    }
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.textInput}
                        {...otherProps}
                        placeholderTextColor={commonStyle.placeholderTextColor}
                        underlineColorAndroid={'transparent'}
                        editable={isEditable}
                        value={
                          this.state[field.key] !== undefined && this.state[field.key] !== null && this.state[field.key].toString()
                        }
                        onChange={(value) => this.inputOnChange(value)}
                      />
                    </View>
                  </View>
                </View>
              )
            } else if (type === 'View') {
              return (
                <Text>adada</Text>
              )
            } else {
              return (
                <Text>dadada</Text>
              )
            }
          }
        }
      }
    })
  }

  render() {
    const {fields} = this.props
    return (
      <View
        style={styles.container}
        {...this.props}
      >
        {this.renderFields(fields)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyle.bgColor
  },
  row: {
    backgroundColor: commonStyle.white
  },
  content: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    marginLeft: 10,
  },
  lastLine: {
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor
  },
  leftPanel: {
    justifyContent: commonStyle.center,
  },
  leftTitle: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    marginRight: 10,
  },
  subTitle: {

  },
  inputContainer: {
    height: 49,
    flex: 1,
    marginRight: 10
  },
  textInput: {
    height: 49,
    fontSize: 14,
    textAlign: 'right',
    color: commonStyle.textBlockColor
  }
})

const _Form = {
  styles: styles,
  form: Form
}

export { _Form as Form}