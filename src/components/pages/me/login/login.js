/**
 * Created by guangqiang on 2017/11/14.
 */
import React from 'react'
import {View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, NativeModules, Platform} from 'react-native'
import {BaseComponent} from '../../../base/baseComponent'
import {Icon, deviceInfo, Toast, commonStyle, storage} from '../../../../utils'
import {Actions} from 'react-native-router-flux'
import {sharePlatform} from '../../../../constants/commonType'

const LoginModule = NativeModules.loginModule

export default class Login extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd: '',
      secret: true
    }
  }

  navigationBarProps() {
    return {
      title: '登录',
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
      <View style={{marginTop: 10}}>
        <View style={{flexDirection: 'row', padding: 10, backgroundColor: commonStyle.white, borderBottomWidth: commonStyle.lineWidth, borderBottomColor: commonStyle.lineColor, alignItems: commonStyle.center}}>
          <Icon name={`oneIcon|user_name_o`} size={20} color={'#646464'}/>
          <TextInput
            style={{flex: 1, marginHorizontal: 10, fontSize: 14}}
            placeholder={'登录邮箱/手机号码'}
            onChangeText={text => {
              text = text.replace(/ /g, '_')
              this.setState({userName: text})
            }}
            value={this.state.userName}
          />
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 10, backgroundColor: commonStyle.white, paddingVertical: 6, alignItems: commonStyle.center}}>
          <Icon name={`oneIcon|pwd_o`} size={20} color={'#646464'}/>
          <TextInput
            style={{flex: 1, marginHorizontal: 10,  fontSize: 14}}
            placeholder={'密码'}
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
            value={this.state.secret}/>
        </View>
      </View>
    )
  }

  loginClick() {
    let params = {}
    params.name = this.state.userName
    params.pwd = this.state.pwd
    params.iconurl = 'http://ovyjkveav.bkt.clouddn.com/17-11-9/48949929.jpg'
    params.gender = '男'
    params.province = '上海'
    params.city = '静安'
    let actions = this.props.mockLogin(params)
    if (actions instanceof Promise) {
      storage.save('userInfo', params)
      this.props.callback && this.props.callback('login')
      Toast.showSuccess('登录成功', () => Actions.pop())
    }
  }

  authLogin(platform) {
    LoginModule.login(sharePlatform[platform], (response) => {
      storage.save('userInfo', response)
      this.props.callback && this.props.callback('login')
      Toast.showSuccess('授权成功！')
      Actions.pop()
    })
  }

  renderLoginBtn() {
    return (
      <View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.loginClick()}
        >
          <Text style={{color: commonStyle.white, fontSize: 17}}>登录</Text>
        </TouchableOpacity>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, marginTop: 15, marginHorizontal: 30, justifyContent: commonStyle.between}}>
          <TouchableOpacity onPress={() => Actions.userRegister()}>
            <Text style={{color: '#0746AB', fontSize: 15, fontWeight: 'bold'}}>免费注册</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: '#555555', fontSize: 15, fontWeight: 'bold'}}>找回密码</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderLoginPanel() {
    return (
      <View>
        <View style={{flexDirection: commonStyle.row, marginTop: 40, alignItems: commonStyle.center, marginHorizontal: 50, justifyContent: commonStyle.center}}>
          <Text style={{height: 1, flex: 1, backgroundColor: '#B8B8B7'}}>-</Text>
          <Text style={{marginHorizontal: 10, color: '#B8B8B7'}}>第三方账号登录</Text>
          <Text style={{height: 1, flex: 1, backgroundColor: '#B8B8B7'}}>-</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: commonStyle.center, marginTop: 20, justifyContent: 'center'}}>
          <TouchableOpacity
            style={{marginHorizontal: 10}}
            onPress={() => this.authLogin('WECHAT')}
          >
            <Icon name={`oneIcon|weixin_s`} size={60} color={'#49BB04'}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 10}}
            onPress={() => this.authLogin('QQ')}
          >
            <Icon name={`oneIcon|qq_s`} size={60} color={'#57B4FF'}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 10}}
            onPress={() => this.authLogin('SINA')}
          >
            <Icon name={`oneIcon|weibo_s`} size={60} color={'#D51705'}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  _render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderInput()}
          {this.renderLoginBtn()}
          {this.renderLoginPanel()}
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
  loginBtn: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 12,
    width: deviceInfo.deviceWidth - 40,
    backgroundColor: '#0D70C5',
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center,
    borderRadius: 25
  }
})