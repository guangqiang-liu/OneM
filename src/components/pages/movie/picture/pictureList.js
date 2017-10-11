/**
 * Created by guangqiang on 2017/10/11.
 */
import React, {Component} from 'react'
import {commonStyle} from '../../../../utils/commonStyle'
import {BaseComponent} from '../../../base/baseComponent'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PictureGrid from './pictureGrid'
export default class PictureList extends BaseComponent {
  constructor(props) {
    super(props)
  }

  navigationBarProps() {
    return {
      title: this.props.title,
      subTitle: this.props.subTitle,
      subTitleStyle: {
        color: commonStyle.white
      },
      titleStyle: {
        color: commonStyle.white
      },
      leftIcon: {
        name: 'nav_back_o',
        size: 20,
        color: commonStyle.white
      },
      navBarStyle: {
        backgroundColor: '#151C28',
        borderBottomColor: '#151C28'
      }
    }
  }

  componentDidMount() {
    this.props.getPictureList({movieId: this.props.id})
  }

  renderGridList() {
    let picArr = this.props.pictureArr
    let typeArr = this.props.pictureType
    let compArr = []
    for (let i = 0; i < typeArr.length; i ++) {
      let type = typeArr[i]
      let tempArr = []

      if (type.type === -1) {
        tempArr = picArr.map((data, index) => {
          let item = {}
          item.key = data.id
          item.data = data
          return item
        })
        compArr.push(<PictureGrid key={i} data={tempArr} tabLabel={type.typeName}/>)
        continue
      }

      for (let j = 0; j < picArr.length; j ++) {
        let pic = picArr[j]
        if (type.type === pic.type) {
          let item = {}
          item.key = pic.id
          item.data = pic
          tempArr.push(item)
        }
      }
      compArr.push(<PictureGrid key={i} data={tempArr} tabLabel={type.typeName}/>)
    }
    return compArr
  }

  _render() {
    let picArr = this.props.pictureArr
    return (
      picArr.length ?
        <ScrollableTabView
          style={{height: 30, backgroundColor: '#161C28'}}
          tabBarActiveTextColor={commonStyle.white}
          tabBarInactiveTextColor={commonStyle.gray}
          tabBarUnderlineStyle={{height: 1, backgroundColor: commonStyle.white}}
        >
          {this.renderGridList()}
        </ScrollableTabView> : null
    )
  }
}