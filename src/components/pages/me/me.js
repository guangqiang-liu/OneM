/**
 * Created by guangqiang on 2017/10/12.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import Action from '../../../actions'
import {BaseComponent} from '../../base/baseComponent'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import {Icon} from '../../../utils/icon'
// import {storage} from '../../../utils'
import storage from 'react-native-simple-store'

class Me extends BaseComponent {

  constructor(props) {
    super(props)
    this.scrollView = null
    this.state = {
      userInfo: undefined
    }
  }

  navigationBarProps() {
    return {
      title: '我的',
      titleStyle: {
        color: commonStyle.white
      },
      hiddenLeftItem: true,
      navBarStyle: {
        backgroundColor: '#161C28',
        borderBottomWidth: 0
      },
      rightIcon: {
        name: 'bubble_message_o',
        size: 20,
        color: commonStyle.white
      }
    }
  }

  componentDidMount() {
    storage.get('register').then(response => {
      this.setState({userInfo: response})
    })
  }

  callback() {
    this.scrollView.scrollTo({x: 0, y: 0, animated: true})
    storage.get('register').then(response => {
      this.setState({userInfo: response})
    })
  }

  renderHeaderContainer() {
    return (
      <View style={{flexDirection: 'row', padding: 10, alignItems: commonStyle.center, backgroundColor: '#161C28'}}>
        <TouchableOpacity>
          <Icon name={'oneIcon|avatar_o'} size={60} color={'#D5D5D5'}/>
        </TouchableOpacity>
        {
          this.state.userInfo ?
            <View style={{marginLeft: 10, justifyContent: commonStyle.center}}>
              <Text style={{marginBottom: 10, fontSize: 16, color: commonStyle.white}}>姓名</Text>
              <TouchableOpacity style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, backgroundColor: '#F36B42', paddingHorizontal: 5, borderRadius: 10}}>
                <Icon name={`oneIcon|bubble_message_o`} size={15} color={commonStyle.white}/>
                <Text style={{color: commonStyle.white, marginLeft: 5, fontSize: 12}}>普通会员</Text>
              </TouchableOpacity>
            </View> :
            <View style={{flexDirection: 'row', alignItems: commonStyle.center}}>
              <TouchableOpacity style={[styles.loginBtn, {borderColor: '#F37207'}]} onPress={() => Actions.userLogin({callback: () => this.callback()})}>
                <Text style={{color: '#F37207'}}>登录</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.loginBtn, {borderColor: '#878787'}]} onPress={() => Actions.userRegister({callback: () => this.callback()})}>
                <Text style={{color: '#878787'}}>注册</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }

  renderDataItem(title, count) {
    return (
      <TouchableOpacity style={{justifyContent: commonStyle.center, alignItems: commonStyle.center, padding: 20}}>
        <Text>{count}</Text>
        <Text style={{marginTop: 5}}>{title}</Text>
      </TouchableOpacity>
    )
  }

  renderDataPanel() {
    return (
      <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, justifyContent: commonStyle.around, borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
        {this.renderDataItem('影评', 100)}
        {this.renderDataItem('看过', 100)}
        {this.renderDataItem('想看', 100)}
        {this.renderDataItem('关注', 20)}
        {this.renderDataItem('收藏', 60)}
      </View>
    )
  }

  renderPanelItem(title, icon, color) {
    return (
      <TouchableOpacity style={{justifyContent: commonStyle.center, alignItems: commonStyle.center, padding: 20}}>
        <Icon name={`oneIcon|${icon}`} size={30} color={color}/>
        <Text style={{marginTop: 5, color: commonStyle.textBlockColor}}>{title}</Text>
      </TouchableOpacity>
    )
  }

  renderActivityPanel() {
    return (
      <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, justifyContent: commonStyle.around, borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
        {this.renderPanelItem('优惠券', 'coupon_o', '#F6A13C')}
        {this.renderPanelItem('口令红包', 'key_o', '#E13C3E')}
        {this.renderPanelItem('礼品卡', 'gift_o', '#7A5CE5')}
        {this.renderPanelItem('时光比', 'magic_star_o', '#F8BD57')}
        {this.renderPanelItem('余额', 'rmb_s', '#F36B42')}
      </View>
    )
  }

  renderItem(title, icon, color, key) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => key ? Actions[key]({callback: () => this.callback()}) : null}
      >
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
          <Text style={{marginRight: 5}}>{title}</Text>
          {
            icon ? <Icon name={`oneIcon|${icon}`} size={20} color={color}/> : null
          }
        </View>
        <Icon name={`oneIcon|push_arror_o`} size={20} color={'#B1B1B1'}/>
      </TouchableOpacity>
    )
  }

  renderList() {
    return (
      <View>
        {this.renderItem('电影票订单')}
        {this.renderItem('商品订单')}
        {this.renderItem('购物车')}
        {this.renderItem('会员俱乐部', 'badge_new_o', '#EE393E')}
        {this.renderItem('我的活动')}
        {this.renderItem('直播')}
        <View style={{borderTopWidth: 10, borderTopColor: commonStyle.lineColor}}>
          {this.renderItem('客服/反馈')}
          {this.renderItem('设置', '', '', 'setting')}
          {this.renderItem('关于我们')}
        </View>
      </View>
    )
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(sc) => this.scrollView = sc}
          style={styles.scStyle}
          bounces={false}
        >
          {this.renderHeaderContainer()}
          {this.renderDataPanel()}
          {this.renderActivityPanel()}
          {this.renderList()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white,
  },
  scStyle: {
  },
  loginBtn: {
    borderRadius: 15,
    justifyContent: commonStyle.center,
    alignItems: commonStyle.center,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'red',
    marginLeft: 20
  },
  item: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    padding: 10,
    borderBottomWidth: commonStyle.lineWidth,
    borderBottomColor: commonStyle.lineColor,
    justifyContent: commonStyle.between
  }
})

const _Me = connect(
  state => state.me.me,
  Action.dispatch('me')
)(Me)

export default _Me