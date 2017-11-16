/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image, ScrollView} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import CommentList from '../reading/commentList'
import {articleType} from '../../../constants/commonType'
import {ShareModal} from '../../../components/common/shareModal'

export default class MusicDetail extends Component {

  constructor(props) {
    super(props)
    this.player = null
    this.state = {
      contentMode: 0,
      shareModalVisible: false
    }
  }

  static onEnter = () => {
    Actions.refresh({
      title: '过往列表',
      backButtonImage: require('../../../assets/images/return.png'),
      hideNavBar: false
    })
  }

  componentDidMount() {
    this.props.getMusicDetail(this.props.id)
  }

  playing() {
    Actions.musicPlayer({music_id: this.props.musicDetail.music_id})
  }

  renderHeader() {
    let data = this.props.musicDetail
    let author = data.story_author
    return (
      <View>
        <TouchableOpacity onPress={() => this.playing()}>
          <Image style={{height: 200}} source={{uri: data.cover}}/>
        </TouchableOpacity>
        <View style={{marginHorizontal: 10}}>
          <View style={styles.playPanel}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <Image style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}} source={{uri: data.cover}}/>
                <View>
                  <Text style={{fontSize: 12, color: '#4D9DE2', marginBottom: 5}}>{data.title}</Text>
                  <Text style={{fontSize: 12, color: '#72715C'}}>{data.title}</Text>
                </View>
              </View>
              <Text style={{color: commonStyle.textBlockColor, fontSize: 16, marginTop: 10}}>{data.title}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 60, height: 15}} source={require('../../../assets/images/xiami_right.png')}/>
              <TouchableOpacity onPress={() => this.playing()}>
                <Image style={{width: 35, height:35}} source={require('../../../assets/images/music_play.png')}/>
              </TouchableOpacity>
              {/*<Text numberOfLines={1} style={{color: commonStyle.textGrayColor, fontSize: 12, marginTop: 5}}>{data.last_update_date}</Text>*/}
            </View>
          </View>
          <View style={styles.toolBar}>
            <TouchableOpacity onPress={() => this.setState({contentMode: 0})}>
              <Image style={{width: 50, height: 50}} source={require('../../../assets/images/music_story_default.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({contentMode: 1})}>
              <Image style={{width: 50, height: 50}} source={require('../../../assets/images/music_lyric_default.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({contentMode: 2})}>
              <Image style={{width: 50, height: 50}} source={require('../../../assets/images/music_about_default.png')}/>
            </TouchableOpacity>
          </View>
          {
            this.state.contentMode === 0 ?
              <View style={styles.descStyle}>
                <Text style={{fontSize: 20, fontWeight: 'bold', lineHeight: 30}}>{data.story_title}</Text>
                <Text style={{color: commonStyle.textGrayColor, fontSize: 13, marginTop: 30}}>{`文 / ${author.user_name}`}</Text>
                <Text style={{fontSize: 14, color: commonStyle.textBlockColor, lineHeight: 28}}>{data.story}</Text>
              </View> : null
          }
          {
            this.state.contentMode === 1 ?
              <View style={styles.lyricStyle}>
                <Text style={{fontSize: 14, color: commonStyle.textBlockColor, lineHeight: 25}}>{data.lyric}</Text>
              </View> : null
          }
          {
            this.state.contentMode === 2 ?
              <View style={styles.singerInfo}>
                <Text style={{fontSize: 14, color: commonStyle.textBlockColor, lineHeight: 25}}>{data.info}</Text>
              </View> : null
          }
          <Text style={{color: commonStyle.textGrayColor, fontSize: 11}}>{data.charge_edt}</Text>
          <Text style={{marginVertical: 20, color: commonStyle.textGrayColor, fontSize: 11}}>{`本文支付转载至"${author.desc}"`}</Text>
        </View>
        <View style={styles.active}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
          >
            <Image style={{width: 40, height: 40}} source={require('../../../assets/images/laud.png')}/>
            <Text style={styles.textStyle}>{data.praisenum}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 40, height: 40}} source={require('../../../assets/images/comment_image.png')}/>
            <Text style={styles.textStyle}>{data.read_num}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => this.setState({shareModalVisible: true})}
          >
            <Image style={{width: 40, height: 40}} source={require('../../../assets/images/share_image.png')}/>
            <Text style={styles.textStyle}>{data.sharenum}</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 10}}>
          <View style={styles.author}>
            <Text style={{}}>作者</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 20, alignItems: 'center'}}>
            <Image style={{height: 50, width: 50, borderRadius: 25}}
                   source={{uri: author.web_url}}
            />
            <View style={{marginLeft: 10, flex: 1, justifyContent: 'center'}}>
              <Text style={{marginBottom: 5}}>{`${author.user_name}`}</Text>
              {
                author.summary ? <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{author.summary}</Text> : null
              }
            </View>
            <TouchableOpacity style={styles.attention}>
              <Text style={{fontSize: 12, color: commonStyle.gray}}>关注</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ShareModal
          visible={this.state.shareModalVisible}
          onVisibleChange={(modalVisible) => this.setState({
            shareModalVisible: modalVisible
          })}/>
      </View>
    )
  }

  renderRow() {
    return (
      <View style={{marginHorizontal: 10}}>
        <CommentList
          type={articleType.MUSIC}
          id={this.props.id}/>
      </View>
    )
  }

  render() {
     if (!this.props.musicDetail.music_id) {
       return (
         <View/>
       )
     } else {
       return (
         <ScrollView style={styles.container}>
           {this.renderHeader()}
           {this.renderRow()}
         </ScrollView>
       )
     }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  },
  playPanel: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: commonStyle.bgColor,
    marginTop: -10
  },
  toolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: commonStyle.white,
    marginVertical: 10,
    justifyContent: 'space-between'
  },
  descStyle: {
    marginBottom: 10
  },
  lyricStyle: {
    backgroundColor: commonStyle.white,
    marginBottom: 10
  },
  singerInfo: {
    backgroundColor: commonStyle.white,
    marginBottom: 10
  },
  authorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 10
  },
  textStyle: {
    color: commonStyle.textGrayColor
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
    marginLeft: 10,
    marginRight: 10
  },
  active: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: commonStyle.lineColor,
    marginBottom: 10
  }
})