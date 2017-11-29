/**
 * Created by guangqiang on 2017/11/26.
 */
import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, Switch} from 'react-native'
import {Icon,commonStyle, deviceInfo, deepClone} from '../../../utils'
import {Actions} from 'react-native-router-flux'

import {MDatePicker, TextArea, Button, CustomAction, CheckBox, Radio, Selector} from './formItems'

class Form extends Component {

  constructor(props) {
    super(props)
    this.fieldsType = {
      TextInput,
      View,
      Switch,
      TextArea,
      DatePicker: MDatePicker,
      Button,
      CheckBox,
      Radio,
      ButtonGroup: 'ButtonGroup',
      Selector
    }

    this.state = {
      ...props.value
    }

    this._component = {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({...nextProps.value})
    }
  }

  getValue() {
    let result = {}
    Object.keys(this._component).map((key, index) => {
      let _value = {}
      if (this._component[key]) {
        if (Object.prototype.toString.call(this._component[key].getValue()) !== '[object Object]') {
          _value[key] = this._component[key].getValue()
        } else {
          _value = this._component[key].getValue()
        }

        result = {
          ...result,
          ..._value
        }
      }
    })

    let cloneState = deepClone(this.state)
    return {...cloneState, ...result}
  }

  _isReadOnly(fields) {
    if (typeof  fields === 'function') {
      return fields()
    } else {
      return fields
    }
  }

  renderSectionHeader(field) {
    if (field.title !== '') {
      return (
        <View style={styles.sectionHeader}>
          <Text style={{marginLeft: 10, color: commonStyle.textBlockColor}}>{field.title}</Text>
        </View>
      )
    } else if (field.title === '') {
      return (
        <View style={{ height: 10 }} />
      )
    }
  }

  renderGroupForm(field) {
    return (
      <View style={styles.group}>
        {this.renderSectionHeader(field)}
        <View style={{}}>
          {this.renderFields(field.items)}
        </View>
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
          if (this.fieldsType[type]) {
            if (type === 'TextInput') {
              return (
                <View
                  key={index}
                  style={[styles.row, !isLastField ? {borderBottomWidth: 1, borderBottomColor: commonStyle.lineColor} : null]}
                >
                  <View style={[styles.content, isLastField ? styles.lastLine : null]}>
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
                        value={this.state[field.key] !== undefined && this.state[field.key] !== null && this.state[field.key].toString()}
                        onChangeText={value => {
                          this.state[field.key] = value
                          this.setState(this.state)
                          let _obj = {}
                          _obj[field.key] = value
                          this.props.onChange && this.props.onChange(_obj)
                        }}
                      />
                    </View>
                  </View>
                </View>
              )
            } else if (type === 'Button') {
              return (
                <View
                  key={index}
                  style={[styles.row, !isLastField ? {borderBottomWidth: 1, borderBottomColor: commonStyle.lineColor} : null]}>
                  <View
                    style={[styles.content, isLastField ? styles.lastLine : null, {justifyContent: commonStyle.center}]}>
                    <Button
                      {...field}
                      {...otherProps}>
                      {field.text}
                    </Button>
                  </View>
                </View>
              )
            } else if (type === 'ButtonGroup') {
              return (
                <View
                  key={index}
                  style={[styles.row, !isLastField ? {borderBottomWidth: 1, borderBottomColor: commonStyle.lineColor} : null]}>
                  <View style={[styles.content, isLastField ? styles.lastLine : null]}>
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
                    <View style={{flex: 1, height: 49, flexDirection: commonStyle.row, alignItems: commonStyle.center, justifyContent: 'flex-end', marginRight: 10}}>
                      {
                        field.items.map((item, index) => {
                          let _cloneBtn = deepClone(item)
                          Object.keys(_cloneBtn).map((key, index) => {
                            if (key.indexOf('on') === 0) {
                              _cloneBtn[key] = this.props[_cloneBtn[key]]
                            }
                          })
                          if (typeof _cloneBtn.selected === 'boolean') {
                            return (
                              <Button
                                key={index}
                                style={[_cloneBtn.style, _cloneBtn.selected ? _cloneBtn.selectedStyle : null]}
                                textStyle={[_cloneBtn.textStyle, _cloneBtn.selected ? _cloneBtn.textSelectedStyle : null]}
                                {..._cloneBtn}
                              >
                                {_cloneBtn.text}
                              </Button>
                            )
                          } else {
                            return (
                              <Button
                                key={index}
                                style={[_cloneBtn.style, _cloneBtn.selected && _cloneBtn.selected() ? _cloneBtn.selectedStyle : null]}
                                textStyle={[_cloneBtn.textStyle, _cloneBtn.selected && _cloneBtn.selected() ? _cloneBtn.textSelectedStyle : null]}
                              >
                                {_cloneBtn.text}
                              </Button>
                            )
                          }
                        })
                      }
                    </View>
                  </View>
                </View>
              )
            } else if (type === 'Switch') {
              return (
                <View
                  key={index}
                  style={[styles.row, !isLastField ? {borderBottomWidth: 1, borderBottomColor: commonStyle.lineColor} : null]}
                >
                  <View style={[styles.content, isLastField ? styles.lastLine : null]}>
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
                    <View style={styles.switch}>
                      <Switch
                        disabled={!isEditable}
                        value={this.state[field.key] !== undefined && this.state[field.key] !== null && this.state[field.key]}
                        onValueChange={value => {
                          this.state[field.key] = value
                          this.setState(this.state)
                          let _obj = {}
                          _obj[field.key] = value
                          this.props.onChange && this.props.onChange(_obj)
                        }}
                      />
                    </View>
                  </View>
                </View>
              )
            } else if (type === 'View') {
              return (
                <View key={index}
                      style={[styles.row, !isLastField ? {borderBottomWidth: 1, borderBottomColor: commonStyle.lineColor} : null]}>
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
                    <View
                      ref={'customView'}
                      style={styles.view}
                      {...field}
                      {...otherProps}
                    >
                      {otherProps.view}
                    </View>
                  </View>
                </View>
              )
            } else if (type === 'TextArea') {
              let Comp = this.fieldsType[type]
              return (
                <View key={index}
                      style={[styles.row, !isLastField ? {borderBottomWidth: 1, borderBottomColor: commonStyle.lineColor} : null]}>
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
                    <Comp
                      ref={(ref) => this._component[field.key] = ref}
                      name={field.key}
                      value={this.state}
                      editable={isEditable}
                      {...field}
                      {...otherProps}
                      onChange={this.props.onChange && this.props.onChange()}
                    />
                  </View>
                </View>
              )
            } else {
              let Comp = this.fieldsType[type]
              return (
                <View key={index}
                      style={[styles.row, !isLastField ? {borderBottomWidth: 1, borderBottomColor: commonStyle.lineColor} : null]}>
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
                    <View style={{flex: 1}}>
                      <Comp
                        ref={(ref) => this._component[field.key] = ref}
                        name={field.key}
                        value={this.state}
                        editable={isEditable}
                        {...field}
                        {...otherProps}
                        descValue={field.name}
                        onChange={this.props.onChange && this.props.onChange()}
                      />
                    </View>
                  </View>
                </View>
              )
            }
          } else {
            return (
              <View key={index}
                    style={[styles.row, !isLastField ? {borderBottomWidth: 1, borderBottomColor: commonStyle.lineColor} : null]}>
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
                  <View style={{ flex: 1, height: 49 }}>
                    <CustomAction
                      type={type}
                      ref={(ref) => this._component[field.key] = ref}
                      name={field.key} value={this.state}
                      {...field}
                      {...otherProps}
                      editable={isEditable}
                      onChange={this.props.onChange}
                      descValue={field.name}
                      />
                  </View>
                </View>
              </View>
            )
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
        {...this.props}>
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
    marginRight: 15
  },
  textInput: {
    height: 49,
    fontSize: 14,
    textAlign: 'right',
    color: commonStyle.textBlockColor
  },
  group: {
  },
  sectionHeader: {
    height: 40,
    justifyContent: commonStyle.center,
    backgroundColor: commonStyle.bgColor
  },
  switch: {
    flex: 1,
    height: 49,
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    marginRight: 10,
    justifyContent: 'flex-end'
  },
  view: {
    flex: 1,
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center
  }
})

const _Form = {
  styles: styles,
  form: Form
}

export { _Form as Form}