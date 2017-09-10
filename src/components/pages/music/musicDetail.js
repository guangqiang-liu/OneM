/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ListView, Image} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
export default class MusicDetail extends Component {

  constructor(props) {
    super(props)
    this.player
    this.renderRow = this.renderRow.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      contentMode: 0
    }
  }

  componentDidMount() {
    this.props.getMusicDetail(this.props.id).then(response => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.value.data.author_list)
      })
    })
  }

  renderRow(rowData, rowId) {
    return (
      <View key={rowId} style={{borderBottomWidth: 1, borderBottomColor: commonStyle.bgColor}}>
        <View style={styles.authorInfo}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <Image source={{uri: rowData.web_url}} style={{width: 50, height: 50, borderRadius: 25, backgroundColor: commonStyle.bgColor}}/>
            <View style={{marginLeft: 10}}>
              <Text style={{padding: 5}}>{rowData.user_name}</Text>
              <Text style={{padding: 5}}>{rowData.wb_name}</Text>
            </View>
          </View>
          <View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 30, height: 30}} source={require('../../../assets/images/laud.png')}/>
            <Text>{rowData.fans_total}</Text>
          </View>
        </View>
        <View style={{margin: 10}}>
          <Text style={{marginBottom: 10, backgroundColor: commonStyle.bgColor, paddingVertical: 10}}>{rowData.summary}</Text>
          <Text style={{marginBottom: 10, backgroundColor: commonStyle.bgColor, paddingVertical: 10}}>{rowData.desc}</Text>
        </View>
      </View>
    )
  }

  playing() {
    Actions.musicPlayer({music_id: this.props.musicDetail.music_id})
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
                <Image style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}} source={{uri: data.cover}}/>
                <View>
                  <Text style={{fontSize: 12, color: '#4D9DE2'}}>{data.title}</Text>
                  <Text style={{fontSize: 12, color: '#72715C'}}>{data.title}</Text>
                </View>
              </View>
              <Text style={{color: commonStyle.textBlockColor, fontSize: 16}}>{data.title}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 60, height: 15}} source={require('../../../assets/images/xiami_right.png')}/>
              <TouchableOpacity
                onPress={() => this.playing()}
              >
                <Image style={{width: 35, height:35}} source={require('../../../assets/images/music_play.png')}/>
              </TouchableOpacity>
              <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{data.last_update_date}</Text>
            </View>
          </View>
          <View style={styles.toolBar}>
            <Text style={{color: commonStyle.textGrayColor, fontSize: 14}}>音乐故事</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
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
          </View>
          {
            this.state.contentMode === 0 ?
              <View style={styles.descStyle}>
                <Text style={{marginBottom: 10, backgroundColor: commonStyle.bgColor, fontSize: 16}}>{data.story_title}</Text>
                <Text style={{marginBottom: 10, backgroundColor: commonStyle.bgColor, fontSize: 13}}>{data.story_summary}</Text>
                <Text style={{backgroundColor: commonStyle.bgColor, fontSize: 14}}>{data.story}</Text>
              </View> : null
          }
          {
            this.state.contentMode === 1 ?
              <View style={styles.lyricStyle}>
                <Text>{data.lyric}</Text>
              </View> : null
          }
          {
            this.state.contentMode === 2 ?
              <View style={styles.singerInfo}>
                <Text style={{fontSize: 14}}>{data.info}</Text>
              </View> : null
          }
          <Text style={{marginBottom: 10}}>{data.charge_edt}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: commonStyle.lineColor}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => this.playing()}
          >
            <Image style={{width: 40, height: 40}} source={require('../../../assets/images/laud.png')}/>
            <Text>{data.praisenum}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 40, height: 40}} source={require('../../../assets/images/comment_image.png')}/>
            <Text>{data.read_num}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 40, height: 40}} source={require('../../../assets/images/share_image.png')}/>
            <Text>{data.sharenum}</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 40, backgroundColor: commonStyle.bgColor, alignItems: 'center', flexDirection: 'row', marginBottom: 10}}>
          <Text style={{marginLeft: 10, color: commonStyle.textGrayColor}}>评论列表</Text>
        </View>
      </View>
    )
  }

  render() {
     if (!this.props.musicDetail.music_id) {
       return (
         <Text>加载中</Text>
       )
     } else {
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
  },
  authorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 10
  }
})