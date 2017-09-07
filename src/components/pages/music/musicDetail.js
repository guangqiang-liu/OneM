/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ListView, Image} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
export default class MusicDetail extends Component {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    this.props.getMusicDetail(this.props.id).then(response => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.value.data.tag_list)
      })
    })
  }

  renderRow() {
    return (
      <Text>评论</Text>
    )
  }

  renderHeader() {
    let data = this.props.musicDetail
    return (
      <View>
        <Image style={{height: 200}} source={{uri: data.cover}}/>
        <View style={{marginHorizontal: 10}}>
          <View style={styles.playPanel}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <Image style={{width: 40, height: 40, borderRadius: 20, backgroundColor: commonStyle.yellow, marginRight: 10}} source={{uri: data.cover}}/>
                <View>
                  <Text style={{fontSize: 12, color: '#4D9DE2'}}>{data.title}</Text>
                  <Text style={{fontSize: 12, color: '#72715C'}}>{data.title}</Text>
                </View>
              </View>
              <Text style={{color: commonStyle.textBlockColor, fontSize: 16}}>{data.title}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 60, height: 15, backgroundColor: commonStyle.yellow}} source={require('../../../assets/images/xiami_right.png')}/>
              <Image style={{width: 35, height:35}} source={require('../../../assets/images/music_play.png')}/>
              <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{data.last_update_date}</Text>
            </View>
          </View>
          <View style={styles.toolBar}>
            <Text style={{color: commonStyle.textGrayColor, fontSize: 14}}>音乐故事</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <Image style={{width: 50, height: 50}} source={require('../../../assets/images/music_story_default.png')}/>
              <Image style={{width: 50, height: 50}} source={require('../../../assets/images/music_lyric_default.png')}/>
              <Image style={{width: 50, height: 50}} source={require('../../../assets/images/music_about_default.png')}/>
            </View>
          </View>
          <View style={styles.descStyle}>
            <Text style={{marginBottom: 10, backgroundColor: commonStyle.bgColor, fontSize: 16}}>{data.story_title}</Text>
            <Text style={{marginBottom: 10, backgroundColor: commonStyle.bgColor, fontSize: 13}}>{data.story_summary}</Text>
            <Text style={{backgroundColor: commonStyle.bgColor, fontSize: 14}}>{data.story}</Text>
          </View>
          <View style={styles.lyricStyle}>
            <Text>{data.lyric}</Text>
          </View>
          <View style={styles.singerInfo}>
            <Text style={{fontSize: 14}}>{data.info}</Text>
          </View>
          <Text style={{marginBottom: 10}}>{data.charge_edt}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: commonStyle.lineColor}}>
          <Image style={{width: 40, height: 40}} source={require('../../../assets/images/laud.png')}/>
          <Image style={{width: 40, height: 40}} source={require('../../../assets/images/comment_image.png')}/>
          <Image style={{width: 40, height: 40}} source={require('../../../assets/images/share_image.png')}/>
        </View>
        <View style={{height: 40, backgroundColor: commonStyle.bgColor, alignItems: 'center', flexDirection: 'row', marginBottom: 10}}>
          <Text style={{marginLeft: 10, color: commonStyle.textGrayColor}}>评论列表</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ListView
        style={styles.container}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader}
        dataSource={this.state.dataSource}
      />
    )
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
    backgroundColor: commonStyle.bgColor,
    marginVertical: 10,
    justifyContent: 'space-between'
  },
  descStyle: {
    marginBottom: 10
  },
  lyricStyle: {
    backgroundColor: commonStyle.bgColor,
    marginBottom: 10
  },
  singerInfo: {
    backgroundColor: commonStyle.bgColor,
    marginBottom: 10
  }
})