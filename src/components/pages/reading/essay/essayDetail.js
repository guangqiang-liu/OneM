/**
 * Created by guangqiang on 2017/9/18.
 */
import React, {Component} from 'react'
import {View, StyleSheet, EnhancedListView, ScrollView, Image, TextInput, InteractionManager} from '../../../common'
import {Text, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../../utils'
import CommentList from '../commentList'
import {articleType} from '../../../../constants/commonType'
import ToolBar from '../bottomToolBar'
import {Icon} from '../../../../utils/icon'
import {BaseComponent} from '../../../base/baseComponent'
export default class EssayDetail extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {}
  }

  navigationBarProps() {
    return {
      title: this.props.essayDetail.hp_title
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.getEssayDetail(this.props.id)
    })
  }

  _render() {
    let data = this.props.essayDetail
    if (data.hp_title) {
      let author = data.author[0] || {}
      return (
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{marginHorizontal: 20}}>
              <Text style={{marginVertical: 30, fontSize: 25}}>{data.hp_title}</Text>
              <Text style={{color: commonStyle.textBlockColor, fontSize: 13}}>{`文 / ${author.user_name}`}</Text>
              {
                data.anchor ? <View style={styles.anchor}>
                  <Icon name={'oneIcon|horn_paused_o'} size={15} color={commonStyle.iconBlack}/>
                  <Text style={{color: commonStyle.textBlockColor, marginLeft: 5}}>{`有声阅读 | `}</Text>
                  <Text style={{color: commonStyle.textBlockColor}}>{data.anchor}</Text>
                </View> : null
              }
              <Text style={{fontSize: 14, color: commonStyle.textBlockColor, lineHeight: 25}}>{data.hp_content}</Text>
              <Text style={{marginVertical: 15, color: commonStyle.textGrayColor, fontSize: 12}}>{data.hp_author_introduce}</Text>
              <Text style={{marginBottom: 20, color: commonStyle.textGrayColor}}>{data.copyright}</Text>
              <View>
                <View style={styles.author}>
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
                  <TouchableOpacity style={styles.attention}>
                    <Text style={{fontSize: 12, color: commonStyle.gray}}>关注</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <CommentList
                type={articleType.ESSAY}
                id={data.content_id}
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

const styles = StyleSheet.create({
  anchor: {
    flexDirection: 'row',
    borderColor: commonStyle.drakGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 20
  },
  author: {
    width: 60,
    borderBottomColor: commonStyle.black,
    borderBottomWidth: 4,
    paddingVertical: 10,
    marginBottom: 10
  },
  attention: {
    borderColor: commonStyle.drakGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginLeft: 10
  }
})