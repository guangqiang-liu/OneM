/**
 * Created by guangqiang on 2017/9/4.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import {Toast} from '../../../utils/toast'
import {Icon} from '../../../utils/icon'
import ImageViewer from 'react-native-image-zoom-viewer'
import {BaseComponent} from '../../base/baseComponent'
export default class PicDetail extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      modalVisible: false
    }
  }

  navigationBarProps() {
    return {
      title: this.state.data.text_authors,
      hiddenLeftItem: !this.props.hiddenLeftItem
    }
  }

  componentDidMount() {
    this.props.getPicDetail(this.props.id).then((response) => {
      this.setState({data: response.value.data})
    })
  }

  toast() {
    // Toast.show('show')
    // Toast.showLong('show')
    Toast.showSuccess('success')
    // Toast.showLongSuccess('success')
    // Toast.showWarning('warning')
    // Toast.showError('error')
  }

  renderHeader() {
    return (
      <TouchableOpacity
        style={styles.closeStyle}
        onPress={() => this.setState({modalVisible: false})}
      >
        <Icon name={'oneIcon|toastError_s'} size={22} color={commonStyle.white}/>
      </TouchableOpacity>
    )
  }

  _renderModal() {
    let tempArr = [{url: this.state.data.hp_img_url}]
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
      >
        <View style={{flex: 1}}>
          <ImageViewer
            imageUrls={tempArr}
            enableImageZoom={true}
            renderHeader={() => this.renderHeader()}
          />
        </View>
      </Modal>
    )
  }

  _render() {
    let data = this.state.data || {}
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.boxStyle}>
            <TouchableOpacity
              onPress={() => this.setState({modalVisible: true})
              }
            >
              <Image style={styles.picStyle} source={{uri: data.hp_img_url}}/>
            </TouchableOpacity>
            <View style={styles.authorInfo}>
              <Text style={{color: commonStyle.textGrayColor}}>{data.hp_title}</Text>
              <Text style={{color: commonStyle.textBlockColor}}>{data.hp_author}</Text>
            </View>
            <Text style={styles.contentStyle}>{data.hp_content}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={styles.creactTime}>{data.hp_makettime}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.toolBar}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => Actions.customComp()}>
              <Image style={styles.smallIcon} resizeMode="contain" source={require('../../../assets/images/diary.png')}/>
              <Text style={{lineHeight: 40, color: commonStyle.textGrayColor}}>小记</Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => Actions.enhancedListView()}
            >
              <Icon name={'fontAwesome|rocket'} size={30} color='#900'/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.toast()}
            >
              <Icon name={'oneIcon|tb_Movie_o'} size={30} color='#900'/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.SwiperComp()}
            >
              <Icon name={'oneIcon|tb_Music_o'} size={30} color='#900'/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.blur()}
            >
              <Icon name={'oneIcon|tb_Music_o'} size={30} color='#900'/>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
        {this._renderModal()}
      </View>
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
  },
  closeStyle: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})