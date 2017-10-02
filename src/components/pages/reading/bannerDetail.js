/**
 * Created by guangqiang on 2017/9/18.
 */
import React from 'react'
import {View, StyleSheet, Text, ListView, Image, TouchableOpacity} from '../../common'
import {BaseComponent} from '../../base/baseComponent'
import {Actions} from 'react-native-router-flux'
import {commonStyle, deviceInfo} from '../../../utils'
export default class BannerDetail extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.data = this.props.data
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})
    }
  }

  navigationBarProps() {
    return {
      navBarStyle: {
        backgroundColor: this.props.data.bgcolor,
        borderBottomColor: this.props.data.bgcolor
      },
      titleStyle:{
        color: commonStyle.white
      },
      title: this.props.data.title,
      leftIcon: {
        name: 'nav_back_o',
        color: commonStyle.white,
        size: 18
      }
    }
  }

  componentDidMount() {
    this.props.getBannerDetail(this.props.data.id).then(response => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.value.data)
      })
    })
  }

  pushDetail(data) {
    switch (parseInt(data.type)) {
      case 1:
        Actions.essayDetail({id: data.item_id})
        break
      case 2:
        Actions.serialDetail({id: data.item_id})
        break
      case 3:
        Actions.questionDetail({id: data.item_id})
        break
      default:
        break
    }
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableOpacity
        style={{justifyContent: 'center', marginHorizontal: 20, marginVertical: 10}}
        onPress={() => this.pushDetail(rowData)}
      >
        <Text numberOfLines={2} style={styles.textStyle}>{rowData.title}</Text>
        <Text numberOfLines={2} style={styles.textStyle}>{'@'+rowData.author}</Text>
        <Text numberOfLines={2} style={styles.textStyle}>{rowData.introduction}</Text>
      </TouchableOpacity>
    )
  }

  renderFooter() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{marginVertical: 30}}>-------------</Text>
        <Text style={styles.textStyle}>{this.props.data.bottom_text}</Text>
        <Image
          style={{marginVertical: 30, height: 150, width: deviceInfo.deviceWidth - 40}}
          source={{uri: this.props.data.cover}}
        />
      </View>
    )
  }
  _render() {
    return (
      <ListView
        style={{flex: 1, backgroundColor: this.data.bgcolor}}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
      />
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 5,
    color: commonStyle.black
  }
})