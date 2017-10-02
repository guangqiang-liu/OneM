/**
 * Created by guangqiang on 2017/9/5.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image, ListView} from 'react-native'
import deviceInfo from '../../../utils/deviceInfo'
import {monthList} from '../../../constants/commonType'
import {parseDate} from '../../../utils/dataUtil'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import {BaseComponent} from '../../base/baseComponent'
export default class PicGridList extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource:  new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
  }

  navigationBarProps() {
    return {
      title: '图文列表'
    }
  }

  componentDidMount() {
    this.props.getGridList(this.props.year, this.props.month).then(response => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.value.data)
      })
    })
  }

  renderRow(rowData, sectionID, rowID) {
    let date = parseDate(rowData.hp_makettime);
    let dateStr = `${date.getDate()} ${monthList[date.getMonth()]}.${date.getFullYear()}`
    return (
      <TouchableOpacity
        style={{backgroundColor: 'white', width: (deviceInfo.deviceWidth - 30) / 2, borderWidth: 1, borderColor: commonStyle.lineColor, marginRight: 8, marginBottom: 8}}
        onPress={() => Actions.picDetail({id: rowData.hpcontent_id, hiddenLeftItem: false})}
      >
        <Image style={styles.picStyle} source={{uri: rowData.hp_img_url}}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: commonStyle.lightGray}}>
          <Text style={{color: commonStyle.textGrayColor, fontSize: 13}}>{rowData.hp_title}</Text>
          <Text style={{color: commonStyle.textGrayColor, fontSize: 13}}>{dateStr}</Text>
        </View>
        <View style={{margin: 8}}>
          <Text numberOfLines={2} style={styles.contentStyle}>{rowData.hp_content}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _render() {
    const dataArr = this.state.dataSource
    return (
      <ListView
        style={styles.listStyle}
        dataSource={dataArr}
        renderRow={this.renderRow}
        contentContainerStyle={styles.listViewStyle}
      />
    )
  }
}

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    backgroundColor: commonStyle.white,
    marginLeft: 12,
    marginTop: 5
  },
  listViewStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: commonStyle.white
  },
  picStyle: {
    height: 150
  }
})