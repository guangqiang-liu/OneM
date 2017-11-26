/**
 * Created by guangqiang on 2017/11/14.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Switch, ScrollView} from 'react-native'
import {BaseComponent} from '../../../base/baseComponent'
import {Icon, Toast, deviceInfo, commonStyle, storage} from '../../../../utils'
import {Actions} from 'react-native-router-flux'

export default class Register extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      mobileNum: '',
      secret: true,
      verifyCode: '',
      pwd: '',
      agree: true,
      sex: null
    }
  }

  navigationBarProps() {
    return {
      title: '注册',
      leftIcon: {
        name: 'nav_back_o',
        size: 20,
        color: commonStyle.white
      },
      titleStyle: {
        color: commonStyle.white
      },
      navBarStyle: {
        backgroundColor: '#161C28',
        borderBottomWidth: 0,
      }
    }
  }

  renderInput() {
    return (
      <View style={{alignItems: commonStyle.center, paddingHorizontal: 10, marginTop: 10, backgroundColor: commonStyle.white}}>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, paddingVertical: 15, borderBottomWidth: commonStyle.lineWidth, borderBottomColor: commonStyle.lineColor}}>
          <Text style={{color: '#646464', marginRight: 10, fontSize: 15}}>手机号</Text>
          <TextInput
            style={{flex: 1, marginHorizontal: 10, fontSize: 14}}
            placeholder={'请输入手机号'}
            onChangeText={text => {
              text = text.replace(/ /g, '_')
              this.setState({mobileNum: text})
            }}
            value={this.state.mobileNum}
          />
        </View>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, paddingVertical: 15, borderBottomWidth: commonStyle.lineWidth, borderBottomColor: commonStyle.lineColor, height: 44}}>
          <Text style={{color: commonStyle.textBlockColor, marginRight: 10}}>验证码</Text>
          <TextInput
            style={{flex: 1, marginHorizontal: 10, fontSize: 14, height: 30}}
            placeholder={'验证码'}
            onChangeText={text => {
              text = text.replace(/ /g, '_')
              this.setState({verifyCode: text})
            }}
            value={this.state.verifyCode}
          />
          <TouchableOpacity style={{paddingVertical: 5, paddingHorizontal: 15, borderColor: '#0B60BC', borderWidth: 1, borderRadius: 30}}>
            <Text style={{color: '#0A5CBA'}}>获取验证码</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, paddingVertical: 15, borderBottomWidth: commonStyle.lineWidth, borderBottomColor: commonStyle.lineColor, height: 44}}>
          <Text style={{color: commonStyle.textBlockColor, marginRight: 20}}>密 码</Text>
          <TextInput
            style={{flex: 1, marginHorizontal: 10, fontSize: 14, height: 30}}
            placeholder={'6-20位字母、数字、符号'}
            secureTextEntry={this.state.secret}
            onChangeText={text => {
              text = text.replace(/ /g, '_')
              this.setState({pwd: text})
            }}
            value={this.state.pwd}
          />
          <Switch
            onValueChange={value => {
              this.setState({secret: value})
            }}
            value={this.state.secret}
          />
        </View>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, paddingVertical: 15, height: 44}}>
          <Text style={{color: commonStyle.textBlockColor, marginRight: 10}}>性 别</Text>
          <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, flex: 1, marginLeft: 20}}>
            <TouchableOpacity
              style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}
              onPress={() => this.setState({sex: '男'})}
            >
              <Text style={{color: '#2955B6', marginRight: 5}}>男</Text>
              <Icon name={'oneIcon|man_o'} size={20} color={this.state.sex === '男' ? '#2955B6' : '#D5D5D5'}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 20, flexDirection: commonStyle.row, alignItems: commonStyle.center}}
              onPress={() => this.setState({sex: '女'})}
            >
              <Text style={{color: '#E25287', marginRight: 5}}>女</Text>
              <Icon name={'oneIcon|woman_o'} size={25}color={this.state.sex === '女' ? '#E25287' : '#D5D5D5'}/>
            </TouchableOpacity>
          </View>
          <Text style={{color: '#646464'}}>选填</Text>
        </View>
      </View>
    )
  }

  submit() {
    let params = {}
    params.name = this.state.mobileNum
    params.code = this.state.verifyCode
    params.pwd = this.state.pwd

    params.iconurl = 'http://ovyjkveav.bkt.clouddn.com/17-11-9/48949929.jpg'
    params.gender = this.state.sex ? this.state.sex : '未知'
    params.province = '上海'
    params.city = '静安'

    let action = this.props.mockRegister(params)
    if (action instanceof Promise) {
      storage.save('userInfo', params)
      this.props.callback && this.props.callback('register')
      Toast.showSuccess('注册成功', () => Actions.pop())
    }
  }

  renderRegisterBtn() {
    return (
      <View style={{marginTop: 40, marginHorizontal: 10}}>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
          <TouchableOpacity
            onPress={() => this.setState({agree: !this.state.agree})}>
            <Icon name={`oneIcon|${this.state.agree ? 'selected_s' : 'unselected_o'}`} size={20} color={this.state.agree ? '#6DC305' : '#D5D5D5'}/>
          </TouchableOpacity>
          <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
            <Text style={{color: '#646464', marginLeft: 10}}>我已阅读并同意</Text>
            <TouchableOpacity>
              <Text style={{color: '#2972C6'}}>《OneM服务条款》</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.registerBtn]}
          onPress={() => this.state.agree ? this.submit() : null}>
          <Text style={{color: commonStyle.white, fontSize: 17}}>注册</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderInput()}
          {this.renderRegisterBtn()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.bgColor
  },
  registerBtn: {
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center,
    borderRadius: 20,
    width:deviceInfo - 20,
    paddingVertical: 10,
    backgroundColor: '#2972C6', marginTop: 20
  }
})