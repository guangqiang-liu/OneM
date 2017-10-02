/**
 * Created by guangqiang on 2017/9/18.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text} from '../../common'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PastList from '../picture/pastList'
import {articleType, beginTime} from '../../../constants/commonType'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
export default class ReadingTabList extends BaseComponent {
  constructor(props) {
    super(props)
  }

  navigationBarProps() {
    return {
      title: '阅读'
    }
  }

  _render() {
    return (
      <View style={{flex: 1}}>
        <ScrollableTabView
          tabBarActiveTextColor={commonStyle.tomato}
          tabBarUnderlineStyle={{backgroundColor: commonStyle.themeColor}}
        >
          <PastList
            beginTime={beginTime.essay}
            pageType={articleType.ESSAY}
            tabLabel='短篇'
          />
          <PastList
            beginTime={beginTime.serial}
            pageType={articleType.SERIAL}
            tabLabel='连载'
          />
          <PastList
            beginTime={beginTime.question}
            pageType={articleType.QUESTIONS}
            tabLabel='问题'
          />
        </ScrollableTabView>
      </View>
    )
  }
}