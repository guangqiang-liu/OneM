/**
 * Created by guangqiang on 2017/9/18.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from '../../../common'
import {commonStyle} from '../../../../utils/commonStyle'
import CommentList from '../commentList'
import {articleType} from '../../../../constants/commonType'
import ToolBar from '../bottomToolBar'
import {BaseComponent} from '../../../base/baseComponent'
export default class QuestionDetail extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  navigationBarProps() {
    return {
      title: this.props.questionDetail.question_title
    }
  }

  componentDidMount() {
    this.props.getQuestionDetail(this.props.id)
  }

  _render() {
    let data = this.props.questionDetail
    if (Object.keys(data).length) {
      let author = data.author_list[0]
      let asker = data.asker
      let answerer = data.answerer
      return (
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{marginHorizontal: 20}}>
              <Text style={{marginVertical: 30, fontSize: 25}}>{data.question_title}</Text>
              <Text style={{color: commonStyle.textBlockColor}}>{`${asker.user_name}问：`}</Text>
              <Text style={{marginVertical: 20, color: commonStyle.textBlockColor, lineHeight: 20}}>{data.question_content}</Text>
              <View style={{borderWidth: commonStyle.lineWidth, borderColor: commonStyle.lineColor}}/>
              <Text style={{color: commonStyle.textBlockColor, marginTop: 20}}>{`${answerer.user_name}答：`}</Text>
              <Text style={{fontSize: 14, color: commonStyle.textBlockColor, lineHeight: 25}}>{data.answer_content}</Text>
              <Text style={{marginBottom: 20, color: commonStyle.textGrayColor}}>{data.charge_edt}</Text>
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
                type={articleType.QUESTIONS}
                id={data.question_id}
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

})