/**
 * Created by guangqiang on 2017/9/18.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, Image, TouchableOpacity} from '../../../common'
import {commonStyle} from '../../../../utils/commonStyle'
import CommentList from '../commentList'
import {articleType} from '../../../../constants/commonType'
import ToolBar from '../bottomToolBar'
import {BaseComponent} from '../../../base/baseComponent'
export default class SerialDetail extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  navigationBarProps() {
    return {
      title: this.props.serialDetail.title
    }
  }

  componentDidMount() {
    this.props.getSearilDetail(this.props.id)
  }

  _render() {
    let data = this.props.serialDetail
    if (Object.keys(data).length) {
      let author = data.author
      return (
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{marginHorizontal: 20}}>
              <Text style={{marginVertical: 30, fontSize: 25}}>{data.title}</Text>
              <Text>{`文 / ${author.user_name}`}</Text>
              {
                data.anchor ? <View style={{flexDirection: 'row', backgroundColor: 'red'}}>
                  <Text>有声阅读|</Text>
                  <Text>{data.anchor}</Text>
                </View> : null
              }
              <Text style={{fontSize: 14, color: commonStyle.textBlockColor, lineHeight: 25}}>{data.content}</Text>
              <Text style={{marginVertical: 15, color: commonStyle.textGrayColor, fontSize: 12}}>{data.charge_edt}</Text>
              <Text style={{marginBottom: 20, color: commonStyle.textGrayColor}}>{data.copyright}</Text>
              <View>
                <View style={{width: 60, borderBottomColor: commonStyle.black, borderBottomWidth: 4, paddingVertical: 10, marginBottom: 10}}>
                  <Text style={{}}>作者</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 20, alignItems: 'center'}}>
                  <Image style={{height: 50, width: 50, borderRadius: 25}}
                         source={{uri: author.web_url}}
                  />
                  <View style={{marginLeft: 10, flex: 1, justifyContent: 'center'}}>
                    <Text style={{marginBottom: 5}}>{`${author.user_name}  ${author.wb_name}`}</Text>
                    {
                      author.summary ? <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{author.summary}</Text> : null
                    }
                  </View>
                  <TouchableOpacity style={{borderColor: commonStyle.drakGray, borderWidth: 1, borderRadius: 5, padding: 8, marginLeft: 10}}>
                    <Text style={{fontSize: 12, color: commonStyle.gray}}>关注</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <CommentList
                type={articleType.SERIAL}
                id={data.id}
              />
            </View>
          </ScrollView>
          <ToolBar data={data}/>
        </View>
      )
    } else {
      return <View/>
    }
  }
}