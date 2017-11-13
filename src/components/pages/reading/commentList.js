/**
 * Created by guangqiang on 2017/9/19.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Action from '../../../actions'
import {View, StyleSheet, Text, Image, ListView, TouchableOpacity, InteractionManager} from '../../../components/common'
import {commonStyle} from '../../../utils'
import {Icon} from '../../../utils/icon'
class ReadingCommentList extends Component {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.state = {
      refreshing: false,
      hasMore: true,
      commentList: []
    }
    this.pageId = 0
  }

  componentDidMount() {
    this.pageId = 0
    this.setState({
      refreshing: true
    })
    this.props.getReadingCommentList({type: this.props.type, id: this.props.id, index: this.pageId}).then(response => {
      console.log(response)
      let commentArr = response.value.data.data
      if (response && commentArr.length) {
        this.pageId = commentArr[commentArr.length - 1].id
      } else {
        this.pageId = -1
      }
      this.setState({
        refreshing: false,
        hasMore: commentArr !== 0,
        commentList: commentArr,
      })
    })
  }

  fetchMoreData() {
    this.props.getReadingCommentList({type: this.props.type, id: this.props.id, index: this.pageId}).then(response => {
      console.log(response)
      let commentArr = response.value.data.data
      if (response && commentArr.length) {
        this.pageId = commentArr[commentArr.length - 1].id
      } else {
        this.pageId = -1
      }
      let tempArr = this.state.commentList.concat(commentArr)
      this.setState({
        refreshing: false,
        hasMore: commentArr !== 0,
        commentList: tempArr,
      })
    })
  }

  renderRow(rowData, sectionId, rowId) {
    let userData = rowData.user
    let touser = rowData.touser
    return (
      <View key='rowId' style={{borderBottomWidth: commonStyle.lineWidth, borderBottomColor: commonStyle.lineColor, paddingVertical: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{width: 40, height: 40, borderRadius: 20}} source={{uri: userData.web_url}}/>
          <Text style={{flex: 1, marginLeft: 10, color: commonStyle.drakGray}}>{userData.user_name}</Text>
          <Text style={{color: commonStyle.drakGray, fontSize: 12}}>{rowData.created_at}</Text>
        </View>
        {
          rowData.touser ?
            <View style={{marginLeft: 50, borderWidth: 1, borderColor: commonStyle.drakGray, flexDirection: 'row', alignItems: 'center', padding: 5}}>
              <Text>{`${touser.user_name}：`}<Text style={{lineHeight: 25, fontSize: 13}}>{rowData.quote}</Text></Text>
            </View> : null
        }
        <Text style={{marginLeft: 50, marginTop: 10, lineHeight: 20, color: commonStyle.textBlockColor}}>{rowData.content}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity style={{marginRight: 10}} >
            <Icon name={'oneIcon|comment_o'} size={14} color={commonStyle.textGrayColor}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name={'oneIcon|like_o'} size={20} color={commonStyle.textGrayColor}/>
          </TouchableOpacity>
          <Text style={{fontSize: 12, color: commonStyle.textGrayColor}}>{rowData.praisenum}</Text>
        </View>
      </View>
    )
  }

  renderHeader() {
    return (
      <View style={{ width: 60, alignItems: 'center', borderBottomColor: commonStyle.black, borderBottomWidth: 4, paddingVertical: 10, marginBottom: 10}}>
        <Text style={{}}>评论列表</Text>
      </View>
    )
  }

  onScroll(e) {
    if(this.state.refreshing || !this.state.hasMore){
      return
    }
    let y = event.nativeEvent.contentOffset.y
    let height = event.nativeEvent.layoutMeasurement.height
    let contentHeight = event.nativeEvent.contentSize.height
    if(y >= contentHeight - height){ // 满足触达屏幕底部
      this.fetchMoreData()
    }
  }

  render() {
    let dataSource = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2}).cloneWithRows(this.state.commentList)
    return (
      <ListView
        enableEmptySections
        onScroll={(e) => this._onScroll(e)}
        dataSource={dataSource}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader}
      />
    )
  }
}

const _ReadingCommentList = connect(
  (state) => state.reading.reading,
  Action.dispatch('reading')
)(ReadingCommentList)

export default _ReadingCommentList