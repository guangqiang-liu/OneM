/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, ListView, Image, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
export default class MusicList extends BaseComponent  {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  navigationBarProps() {
    return {
      title: '音乐列表'
    }
  }

  componentDidMount() {
    this.props.getMusicList(this.props.year, this.props.month).then(response => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.value.data)
      })
    })
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableOpacity
        key={rowId}
        style={styles.cellStyle}
        onPress={() => Actions.musicDetail({id: parseInt(rowData.id)})}
      >
        <Image style={{width: 60, height: 60}} source={{uri: rowData.cover}}/>
        <View style={styles.contentStyle}>
          <Text style={{marginVertical: 5}}>{rowData.title}</Text>
          <Text style={{marginVertical: 5}}>{rowData.author.user_name}</Text>
        </View>
        <Image source={require('../../../assets/images/forward.png')} resizeMode={"center"}/>
      </TouchableOpacity>
    )
  }

  _render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cellStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomColor: commonStyle.lineColor,
    borderBottomWidth: commonStyle.lineWidth
  },
  contentStyle: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10
  }
})