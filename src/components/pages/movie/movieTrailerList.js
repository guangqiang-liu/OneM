/**
 * Created by guangqiang on 2017/10/10.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, ListView, StyleSheet} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
import {Icon} from '../../../utils/icon'
import {Actions} from 'react-native-router-flux'
export default class TrailerList extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  navigationBarProps() {
    return {
      title: '预告片&拍摄花絮',
      titleStyle: {
        color: commonStyle.white
      },
      leftIcon: {
        name: 'nav_back_o',
        size: 20,
        color: commonStyle.white
      },
      navBarStyle: {
        backgroundColor: '#151C28',
      }
    }
  }

  componentDidMount() {
    this.props.getTrailerList({pageIndex: 1, movieId: this.props.id})
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableOpacity style={styles.cellStyle} onPress={() => Actions.moviePlayer({url: rowData.url, title: rowData.title})}>
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: commonStyle.clear}}>
          <Image style={styles.img} source={{uri: rowData.image}}/>
          <View style={{position: commonStyle.absolute}}>
            <Icon name={'oneIcon|play_cycle_o'} size={25} color={commonStyle.white}/>
          </View>
        </View>
        <View style={{paddingHorizontal: 10, flex: 1, height: 60, justifyContent: commonStyle.around}}>
          <Text style={{fontSize: 15, color: commonStyle.textBlockColor, fontWeight: 'bold'}}>{rowData.title}</Text>
          <Text style={{color: commonStyle.textGrayColor}}>{`片长：${rowData.length}`}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _render() {
    let dataArr = this.props.trailerList || []
    let dataSource = this.state.dataSource.cloneWithRows(dataArr)
    return (
      <ListView
        style={styles.container}
        dataSource={dataSource}
        renderRow={this.renderRow}
        enableEmptySections
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  },
  cellStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor
  },
  img: {
    width: 100,
    height: 60
  }
})