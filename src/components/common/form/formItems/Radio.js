/**
 * Created by guangqiang on 2017/11/28.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {commonStyle, deviceInfo} from '../../../../utils'
import {Button} from '../../button/enhancedBtn'

class Radio extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectValue: props.value[props.name]
    }
  }

  componentWillReceiveProps(nextProps) {
    let name = this.props.name
    if (this.props.value[name] !== nextProps.value[name] && nextProps.value[name]) {
      this.setState({selectValue: nextProps.value[name]})
    }
  }

  getValue() {
    return this.state.selectValue
  }

  renderItem(item, name) {
    if (item.type === 'button') {
      return (
        <Button
          style={[{width: 50, height: 20, borderRadius: 15}, this.state.selectValue === item.value ? {borderColor: commonStyle.themeColor} : null]}
          textStyle={this.state.selectValue === item.value ? {color: commonStyle.themeColor} : null}
          onPress={() => {
            if (this.state.selectValue !== item.value) {
              this.setState({selectValue: item.value}, () => this.props.onChange && this.props.onChange({[name]: this.state.selectValue}))
            }
          }}
        >
          {item.label}
        </Button>
      )
    } else {
      return (
        <TouchableOpacity
          style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, marginRight: 10}}
          activeOpacity={1}
          onPress={() => {
            if (this.state.selectValue !== item.value) {
                this.setState({selectValue: item.value},
                () => this.props.onChange && this.props.onChange({[name]: this.state.selectValue}))
            }
          }}>
          {
            this.state.selectValue === item.value ?
              <View style={[styles.circle, {borderColor: commonStyle.themeColor}]}>
                <View style={styles.dot}/>
              </View> :
              <View style={styles.circle}/>
          }
          <Text style={{marginLeft: 5}}>{item.label}</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View
        style={styles.container}
        onChange={this.props.onChange}>
        {
          this.props.items.map(item => {
            return this.renderItem(item, this.props.name)
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: commonStyle.row,
    justifyContent: 'flex-end',
    alignItems: commonStyle.center,
    paddingRight: 10,
    height: 49
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 1,
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: commonStyle.themeColor
  }
})

export {Radio}