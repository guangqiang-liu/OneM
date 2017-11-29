/**
 * Created by guangqiang on 2017/11/28.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {commonStyle, deviceInfo} from '../../../../utils'
import {Button} from '../../button/enhancedBtn'

class CheckBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectValue: props.value[props.name] || []
    }
  }

  componentWillReceiveProps(nextProps) {
    let name = this.props.name
    if (this.props.value[name] !== nextProps.value[name] && nextProps.value[name]) {
      this.setState({
        selectValue: nextProps.value[name]
      })
    }
  }

  getValue() {
    return this.state.selectValue
  }

  renderItem(item, name) {
    return (
      <Button
        style={[{width: 50, height: 20, borderRadius: 15}, this.state.selectValue.includes(item.value) ? { borderColor: commonStyle.themeColor } : null]}
        textStyle={this.state.selectValue.includes(item.value) ? {color: commonStyle.themeColor} : null}
        onPress={() => {
          if (this.state.selectValue.includes(item.value)) {
            this.state.selectValue.splice(this.state.selectValue.indexOf(item.value), 1)
            this.setState({selectValue: this.state.selectValue}, () => this.props.onChange && this.props.onChange({[name]: this.state.selectValue}))
          } else {
            this.state.selectValue.push(item.value)
            this.setState({selectValue: this.state.selectValue}, () => this.props.onChange && this.props.onChange({[name]: this.state.selectValue}))
          }
        }}>
        {item.label}
      </Button>
    )
  }

  render() {
    if (this.props.items) {
      return (
        <View style={styles.container} onChange={this.props.onChange}>
          {
            this.props.items.map(item => {
              return this.renderItem(item, this.props.name)
            })
          }
        </View>
      )
    } else if (typeof  this.props.dataFunc === 'function') {
      return (
        <View style={styles.container} onChange={this.props.onChange}>
          {
            this.props.dataFunc((data) => data.map(item  => this.renderItem(item, this.props.name)))
          }
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 10,
    height: 49
  }
})

export {CheckBox}