/**
 * Created by guangqiang on 2017/9/4.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import {Icon} from '../../../utils/icon'
export default class PicDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.props.getPicDetail(this.props.id).then((response) => {
      this.setState({data: response.value.data})
    })
  }

  render() {
    let data = this.state.data || {}
    return (
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.boxStyle}>
          <Image style={styles.picStyle} source={{uri: data.hp_img_url}}/>
          <View style={styles.authorInfo}>
            <Text style={{color: commonStyle.textGrayColor}}>{data.hp_title}</Text>
            <Text style={{color: commonStyle.textBlockColor}}>{data.hp_author}</Text>
          </View>
          <Text style={styles.contentStyle}>{data.hp_content}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={styles.creactTime}>{data.hp_makettime}</Text>
          </View>
        </View>
        <View style={styles.toolBar}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.smallIcon} resizeMode="contain" source={require('../../../assets/images/diary.png')}/>
            <Text style={{lineHeight: 40, color: commonStyle.textGrayColor}}>小记</Text>
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => Actions.helloWord()}
          >
            <Image style={styles.smallIcon} resizeMode="contain" source={require('../../../assets/images/laud.png')}/>
            <Text style={{lineHeight: 40, color: commonStyle.textGrayColor}}>{data.praisenum}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.webView()}
          >
            <Image style={styles.smallIcon} resizeMode="contain" source={require('../../../assets/images/share_image.png')}/>
          </TouchableOpacity>
          <Icon name='fontAwesome|rocket' size={30} color='#900'/>
          <Icon name='oneIcon|tb_Movie' size={30} color='#900'/>
          <Icon name='oneIcon|tb_Music' size={30} color='#900'/>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    padding: 10,
    backgroundColor: commonStyle.white
  },
  boxStyle: {
    borderColor: commonStyle.lineColor,
    borderWidth: 1,
    padding: 10
  },
  authorInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  picStyle: {
    height: 250,
    backgroundColor: commonStyle.white
  },
  contentStyle: {
    marginVertical: 20
  },
  creactTime: {
    color: commonStyle.textGrayColor
  },
  toolBar: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
  },
  smallIcon: {
    width: 40,
    height: 40
  }
})