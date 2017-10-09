/**
 * Created by guangqiang on 2017/10/5.
 */
import React, {Component} from 'react'
import {View, ListView, Image, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import ComingNewCell from './comeingnewCell'
import {Icon} from '../../../../utils/icon'
import {Actions} from 'react-native-router-flux'
export default class ShowTimeList extends Component {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <ComingNewCell key={rowId} rowData={rowData}/>
    )
  }

  renderAttentionList() {
    return this.props.attentionArr.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={{marginLeft: 10, width: 80}}
        onPress={() => Actions.movieDetail({id: item.id})}
      >
        <Image
          style={{width: 80, height: 120}}
          source={{uri: item.image}}
        />
        <Text numberOfLines={1} style={{fontSize: 12, marginVertical: 6, color: commonStyle.textBlockColor}}>{item.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 11, color: commonStyle.textGrayColor}}>{`${item.wantedCount}人想看`}</Text>
          <Icon name={'oneIcon|love_o'} size={15} color={'#F86728'}/>
        </View>
      </TouchableOpacity>
    ))
  }

  renderHeader() {
    return (
      <ScrollView
        style={{height: 160, margin: 10, marginLeft: 0}}
        horizontal={true}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
      >
        {this.renderAttentionList()}
      </ScrollView>
    )
  }

  render() {
    let dataSource = this.state.dataSource.cloneWithRows(this.props.comingNewArr)
    return (
      <ListView
        style={styles.content}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader}
        enableEmptySections
        dataSource={dataSource}
      />
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: commonStyle.white
  }
})