/**
 * Created by guangqiang on 2017/10/11.
 */
import React, {Component} from 'react'
import {View, Image, StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import deviceInfo from '../../../../utils/deviceInfo'
import ImageViewer from 'react-native-image-zoom-viewer'
import {Icon} from '../../../../utils/icon'
const columns = 3
const ITEM_WIDTH =  (deviceInfo.deviceWidth - 6 * 4) / columns
export default class PictureGrid extends Component {

  constructor(props) {
    super(props)
    this._flatList = null
    this.state = {
      refreshing: false,
      modalVisible: false,
      picIndex: 0
    }
  }

  _renderItem = (info) => {
    let item = info.item.data
    return (
      <TouchableOpacity
        style={{paddingRight: 6, marginTop: 6}}
        onPress={() => this.setState({modalVisible: true, picIndex: info.index})}>
        <Image style={{width: ITEM_WIDTH, height: ITEM_WIDTH}} source={{uri: item.image}}/>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    return (
      <TouchableOpacity
        style={styles.closeStyle}
        onPress={() => this.setState({modalVisible: false})}>
        <Icon name={'oneIcon|toastError_s'} size={22} color={commonStyle.white}/>
      </TouchableOpacity>
    )
  }

  _renderModal() {
    let tempArr = this.props.data.map((item, index) => {
      let data = {}
      data.url = item.data.image
      return data
    })
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
      >
        <View style={{flex: 1}}>
          <ImageViewer
            imageUrls={tempArr}
            enableImageZoom={true}
            index={this.state.picIndex}
            renderHeader={() => this.renderHeader()}
          />
        </View>
      </Modal>
    )
  }

  render() {
    const {data} = this.props
    return (
      <View style={{flex: 1, paddingLeft: 6, marginBottom: 6}}>
        <FlatList
          ref={(ref) => this._flatList = ref}
          data={data}
          ListHeaderComponent={() => <View/>}
          ListFooterComponent={() => <View/>}
          ItemSeparatorComponent={() => <View/>}
          renderItem={this._renderItem}
          numColumns={columns}
          columnWrapperStyle={{borderWidth: 0, borderColor: 'black'}}
          refreshing={this.state.refreshing}
          getItemLayout={(data, index) => ({length: ITEM_WIDTH, offset:(ITEM_WIDTH) * index, index})}
          onRefresh={() => {}}
          onEndReachedThreshold={0.1}
          onEndReached={() => {}}
          onViewableItemsChanged={() => {}}
        />
        {this._renderModal()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 30,
  },
  closeStyle: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})