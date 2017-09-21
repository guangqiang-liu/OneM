/**
 * Created by guangqiang on 2017/8/30.
 */
import {Venilog} from './venilog'

// const _TouchableOpacity = Venilog.createVenilogComponent(TouchableOpacity)
// const _Button = Venilog.createVenilogComponent(Button)
//
// export {_TouchableOpacity as TouchableOpacity}
// export {_Button as Button}

import {View, StyleSheet, ScrollView, ListView, RefreshControl, ViewPropTypes, ActivityIndicator, InteractionManager, Image, Text} from 'react-native'
import {Button} from './button'
// import {Text} from './text'
import {TouchableOpacity} from './touchable/touchableOpacity'
import NavigationBar from './navigationBar'
import WebView from './webView'
import BaseComponent from '../base/baseComponent'
import {EnhancedListView} from './listView/EnhancedListView'
import {SimpleListView} from './listView'
/**
 * 统一将 react-native库中的组件 + 自定义组件 统一收口管理
 */
export {
  View,
  StyleSheet,
  ScrollView,
  ListView,
  RefreshControl,
  ViewPropTypes,
  ActivityIndicator,
  InteractionManager,
  Image,
  Text,
  Button,
  TouchableOpacity,
  NavigationBar,
  WebView,
  BaseComponent,
  EnhancedListView,
  SimpleListView
}