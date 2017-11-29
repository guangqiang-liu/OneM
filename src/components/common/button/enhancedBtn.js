/**
 * Created by guangqiang on 2017/10/11.
 */
import React, { Component, PropTypes } from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Text
} from 'react-native'
import { commonStyle } from '../../../utils'

const systemButtonOpacity = 0.8

class Button extends Component {

  constructor(props) {
    super(props)
  }

  static displayName = 'Button'

  _renderContent(children, textStyle) {

    let _color
    let _size
    let { type, size, disabled, textNumberOfLines } = this.props
    if (type === 'default' || type === undefined) {
      _color = commonStyle.gray
    } else {
      _color = '#fff'
    }

    if (disabled) {
      _color = this.props.disabledIconColor || commonStyle.lightGray
    }

    if (size === 'small') {
      _size = 25 - 12
    } else if (size === 'large') {
      _size = 40 - 12
    } else if (typeof size === 'number') {
      _size = (size > 30) ?  (size - 12) : (size - 8)
    } else {
      _size = 30 - 12
    }

    if (typeof children === 'string') {
      return (
        <Text numberOfLines={textNumberOfLines || 1} style={textStyle}>{children}</Text>
      )
    } else {
      if (Array.isArray(children)) {
        return children.map((child, index) => {
          if (typeof child === 'string') {
            return (
              <Text key={index} numberOfLines={textNumberOfLines || 1} style={textStyle}>
                {child}
              </Text>
            )
          } else {
            if (child.type && child.type.displayName === 'Icon') {
              return React.cloneElement(child, { color: _color, size: _size, key: index, ...child.props })
            } else {
              return React.cloneElement(child, { key: index, ...child.props })
            }
          }
        })
      } else {
        if (children.type && children.type.displayName === 'Icon') {
          return React.cloneElement(children, { color: _color, size: _size, ...children.props })
        } else {
          return React.cloneElement(children, { ...children.props })
        }
      }
    }
  }

  _computeActiveOpacity() {
    if (!this.props.disabled && !this.props.loading) {
      return this.props.activeOpacity !== null ? this.props.activeOpacity : systemButtonOpacity
    } else {
      return 1.0
    }
  }

  render() {

    let touchableProps = {
      activeOpacity: this._computeActiveOpacity()
    }

    let { type, size, disabled, shape, textNumberOfLines, children } = this.props

    let style = []
    let textStyle = []

    if (!this.props.disabled && !this.props.loading) {
      touchableProps.onPress = this.props.onPress
      touchableProps.onPressIn = this.props.onPressIn
      touchableProps.onPressOut = this.props.onPressOut
      touchableProps.onLongPress = this.props.onLongPress
    }

    if (type === 'banner') {
      style.push(styles.banner);
      textStyle.push(styles.bannerText);
    } else if (type === 'primary') {
      style.push(styles.primary);
      textStyle.push(styles.primaryText);
    } else if (type === 'secondary') {
      style.push(styles.secondary);
      textStyle.push(styles.secondaryText);
    } else if (type === 'bordered') {
      style.push(styles.bordered);
      textStyle.push(styles.borderedText);
    } else {
      style.push(styles.default);
      textStyle.push(styles.defaultText);
    }

    if (size === 'small') {
      style.push(styles.smallSize);
    } else if (size === 'large') {
      style.push(styles.largeSize);
      textStyle.push(styles.largeText);
    }

    textStyle.push(this.props.textStyle);

    if (disabled === true) {
      style.push(styles.disabled);
      textStyle.push(styles.disabledText);
      textStyle.push(this.props.disabledTextStyle);
    }

    if (shape === 'circle') {
      if (size === 'small') {
        style.push(styles.smallCircleSize);
      } else if (size === 'large') {
        style.push(styles.largeCircleSize);
      } else if (typeof size === 'number') {
        style.push({
          width: size,
          height: size,
          borderRadius: size / 2,
        });
      } else {
        style.push(styles.defaultCircleSize)
      }
    }

    return (
      <TouchableOpacity
        {...touchableProps}
        style={[styles.container, style, this.props.style, disabled ? this.props.disabledStyle : '']}>
        {
          this.props.loading ?
            <ActivityIndicator size={'small'} animating={true} color="#fff" /> :
            this._renderContent(this.props.children, textStyle)
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    height: 35,
    margin: 5,
  },
  icon: {
    marginRight: 10,
  },
  banner: {
    borderRadius: 0,
    backgroundColor: commonStyle.themeColor,
    margin: 0,
  },
  bannerText: {
    color: 'white',
    fontSize: 14,
  },
  primary: {
    backgroundColor: commonStyle.themeColor,
  },
  primaryText: {
    color: 'white',
    fontSize: 12,
  },
  secondary: {
    backgroundColor: commonStyle.yellow,
  },
  secondaryText: {
    color: 'white',
    fontSize: 12,
  },
  bordered: {
    backgroundColor: 'transparent',
    borderColor: commonStyle.themeColor,
    borderWidth: 1,
  },
  borderedText: {
    color: commonStyle.themeColor,
    fontSize: 12,
  },
  default: {
    backgroundColor: 'transparent',
    borderColor: commonStyle.gray,
    borderWidth: 1,
  },
  defaultText: {
    color: commonStyle.gray,
    fontSize: 12,
  },
  smallSize: {
    height: 25,
  },
  largeSize: {
    height: 40,
  },
  largeText: {
    fontSize: 14,
  },
  disabled: {
    borderColor: commonStyle.lightGray,
    borderWidth: 1,
    backgroundColor: commonStyle.bgColor,
  },
  disabledText: {
    color: commonStyle.lightGray,
    fontWeight: 'normal',
  },
  smallCircleSize: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
  },
  largeCircleSize: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  defaultCircleSize: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
})

export { Button }