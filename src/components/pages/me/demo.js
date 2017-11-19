/**
 * Created by guangqiang on 2017/11/13.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, ListView} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'

const data = [
  {
    key: 'testAntdMobile',
    scene: 'antd-mobile'
  },
  {
    key: 'blur',
    scene: 'TestBlurComponent'
  },
  {
    key: 'imgZoom',
    scene: 'TestImageZoomComponent'
  },
  {
    key: 'testMessageBar',
    scene: 'TestMessageBar'
  },
  {
    key: 'testOrientation',
    scene: 'TestOrientation'
  },
  {
    key: 'loading',
    scene: 'Loading'
  },
  {
    key: 'launch',
    scene: 'ReactNativeRouterFluxDemo'
  },
  {
    key: 'testScrollableTabView',
    scene: 'scrollable-tab-view'
  },
  {
    key: 'SwiperComp',
    scene: 'TestSwiperComponent'
  },
  {
    key: 'testIcon',
    scene: 'TestIcon'
  },
  {
    key: 'testViewPager',
    scene: 'viewPager'
  },
  {
    key: 'enhancedListView',
    scene: 'EnhancedListViewDemo'
  },
  {
    key: 'webView',
    scene: 'WebView'
  },

  {
    key: 'network',
    scene: 'Network'
  },
  {
    key: 'testLogDot',
    scene: '日志埋点'
  },
  {
    key: 'testRedux',
    scene: 'TestRedux'
  },
  {
    key: 'customComp',
    scene: '包装原生组件'
  }
]

export default class Demo extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !==r2 })
    }
  }

  navigationBarProps() {
    return {
      title: '我的',
      rightTitle: '作者'
    }
  }

  onRightPress() {
    return Actions.author()
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableOpacity
        style={styles.cellStyle}
        onPress={() => Actions[rowData.key]()}
      >
        <Text style={{flex: 1, textAlign: commonStyle.center}}>{rowData.scene}</Text>
        <Image style={{width: 20, height: 20}} source={require('../../../assets/images/forward.png')}/>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    return (
      <View style={styles.headerStyle}>
        <Text>项目中使用到的常用功能Demo集合</Text>
      </View>
    )
  }

  _render() {
    const dataSource = this.state.dataSource.cloneWithRows(data)
    return (
      <View style={styles.container}>
        <ListView
          style={{flex: 1}}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderHeader={this.renderHeader}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.bgColor,
  },
  cellStyle: {
    justifyContent: commonStyle.center,
    alignItems: commonStyle.center,
    flexDirection: 'row',
    backgroundColor: commonStyle.white,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  headerStyle: {
    height: 40,
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center,
    backgroundColor: commonStyle.bgColor,
  }
})